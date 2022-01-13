const cheerio = require('cheerio')
const axios = require('axios')

async function torrentProject(query, page = '0') {
    var ALLTORRENT = [];
    var ALLURL = [];
    const url = `https://torrentproject2.com/?t=${query}&p=${page}&orderby=seeders`;
    let html;
    try {
        html = await axios.get(url, headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
        });

    } catch {
        return null;
    }

    const $ = cheerio.load(html.data);

    $('.tt div').each((i, element) => {

        if (i > 1) {
            let url = "https://torrentproject2.com" + $(element).find('span').eq(0).find('a').attr('href');
            ALLURL.push(url);
            let torrent = {
                'Name': $(element).find('span:nth-child(1)').text().trim(),
                'Size': $(element).find('span:nth-child(5)').text(),
                'DateUploaded': $(element).find('span:nth-child(4)').text().trim(),
                'Seeders': $(element).find('span:nth-child(2)').text().trim(),
                'Leechers': $(element).find('span:nth-child(3)').text().trim(),
                'Url': url
            }
            if (torrent.Name !== '') {
                ALLTORRENT.push(torrent);
            }
        }
    })

    await Promise.all(ALLURL.map(async url => {
        for (let i = 0; i < ALLTORRENT.length; i++) {
            if (ALLTORRENT[i]['Url'] === url) {
                let html;
                try {
                    html = await axios.get(url, headers = {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
                    });
                } catch {
                    return;
                }
                const $ = cheerio.load(html.data);
                let magnet = $('.usite a').attr('href');
                let startMagnetIdx = magnet.indexOf('magnet');
                magnet = magnet.slice(startMagnetIdx);
                ALLTORRENT[i].Magnet = decodeURIComponent(magnet);

            }
        }

    }))

    return ALLTORRENT;
}


module.exports = torrentProject;