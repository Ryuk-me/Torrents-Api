const cheerio = require('cheerio')
const axios = require('axios')


async function rarbg(query, page = '1') {
    const ALLURLARRAY = [];
    var ALLTORRENT = [];
    const url = "https://rargb.to/search/" + page + "/?search=" + query;
    let html;
    try {
        html = await axios.get(url, headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
        });

    } catch {
        return null;
    }

    const $ = cheerio.load(html.data);

    $('table.lista2t tbody').each((_, element) => {
        $('tr.lista2').each((_, el) => {
            const data = {};
            const td = $(el).children('td');
            data.Url = "https://rargb.to" + $(td).eq(1).find('a').attr('href');
            ALLURLARRAY.push(data.Url);
            data.Name = $(td).eq(1).find('a').attr('title');
            data.Category = $(td).eq(2).find('a').text();
            data.DateUploaded = $(td).eq(3).text();
            data.Size = $(td).eq(4).text();
            data.Seeders = $(td).eq(5).find('font').text();
            data.Leechers = $(td).eq(6).text();
            data.UploadedBy = $(td).eq(7).text();
            ALLTORRENT.push(data);

        })
    });

    await Promise.all(ALLURLARRAY.map(async (url) => {
        for (let i = 0; i < ALLTORRENT.length; i++) {
            if (ALLTORRENT[i]['Url'] === url) {
                let html;
                try{
                    html = await axios.get(url, headers = {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
                    });
                }catch{
                    return null;
                }
                
                let $ = cheerio.load(html.data);

                let poster = "https://rargb.to" + $("tr:nth-child(4) > td:nth-child(2) > img:nth-child(1)").attr('src') || "";
                if (!poster.endsWith('undefined')) {
                    ALLTORRENT[i].Poster = poster;
                } else {
                    ALLTORRENT[i].Poster = "";
                }
                ALLTORRENT[i].Magnet = $("tr:nth-child(1) > td:nth-child(2) > a:nth-child(3)").attr('href');
            }
        }

    }))
    return ALLTORRENT;
}
module.exports = rarbg;