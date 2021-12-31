const cheerio = require('cheerio')
const axios = require('axios')


async function kickAss(query, page = '1') {
    var ALLTORRENT = [];
    let ALLURL = [];
    const url = "https://kickasstorrents.to/usearch/" + query + "/" + page + "/";
    let html;
    try {
        html = await axios.get(url, headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
        });

    } catch {
        return null;
    }

    const $ = cheerio.load(html.data);

    $('tbody tr').each((i, element) => {
        if (i > 2) {
            let url = "https://kickasstorrents.to" + $(element).find('a.cellMainLink').attr('href');
            if (!url.endsWith('undefined')) {
                ALLURL.push(url);
                let torrent = {
                    "Name": $(element).find('a.cellMainLink').text().trim(),
                    "Size": $(element).find('td').eq(1).text().trim(),
                    "UploadedBy": $(element).find('td').eq(2).text().trim(),
                    "Age": $(element).find('td').eq(3).text().trim(),
                    "Seeders": $(element).find('td').eq(4).text().trim(),
                    "Leechers": $(element).find('td').eq(5).text().trim(),
                    "Url": url
                }
                ALLTORRENT.push(torrent);
            }
        }

    })

    await Promise.all(ALLURL.map(async (url) => {
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
                ALLTORRENT[i].Magnet = $('a.kaGiantButton').attr('href');

            }
        }
    }))
    return ALLTORRENT;
}
module.exports = kickAss;