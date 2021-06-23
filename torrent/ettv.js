const cheerio = require('cheerio');
const axios = require('axios');
const dev = require('request-promise');

async function ettvCentral(query, page = '0') {
    const ALLURLARRAY = [];
    var ALLTORRENT = [];
    const url = "https://www.ettvcentral.com/torrents-search.php?search= " + query + "&page=" + page;
    let html;
    try {
        html = await dev({
            url: url,
            // proxy: 'Enter your proxy uri here'
        })

    } catch {
        return null;
    }

    const $ = cheerio.load(html);
    $('table tbody').each((_, element) => {
        $('tr').each((_, el) => {
            const data = {};
            const td = $(el).children('td');
            data.Name = $(td).eq(1).find('a b').text();
            data.Category = $(td).eq(0).find('a img').attr('title');
            data.DateUploaded = $(td).eq(2).text();
            data.Size = $(td).eq(3).text();
            data.Seeders = $(td).eq(5).text();
            data.Leechers = $(td).eq(6).text();
            data.UploadedBy = $(td).eq(7).text();
            data.Url = "https://www.ettvcentral.com" + $(td).eq(1).find('a').attr('href');
            if (data.Name !== "") {
                ALLURLARRAY.push(data.Url);
                ALLTORRENT.push(data);
            }
        })
    })
    await Promise.all(ALLURLARRAY.map(async (url) => {
        for (let i = 0; i < ALLTORRENT.length; i++) {
            if (ALLTORRENT[i]['Url'] === url) {
                let html;
                try {
                    html = await dev({
                        url: url,
                        // proxy: 'Enter your proxy uri here',
                    })
                } catch {
                    return null;
                }
                let $ = cheerio.load(html);
                let poster = '';
                try {
                    poster = $('div .torrent_data').find('center img').attr('src');
                } catch {
                    //
                }
                ALLTORRENT[i].Poster = poster;
                ALLTORRENT[i].Magnet = $("#downloadbox > table > tbody > tr > td:nth-child(1) > a").attr('href');

            }
        }
    }))

    return ALLTORRENT;
}

module.exports = ettvCentral