const cheerio = require('cheerio');
const axios = require('axios');

async function torLock(query = '', page = '1') {

    const ALLTORRENT = [];
    const ALLURL =[]
    const url = encodeURI('https://www.torlock.com/all/torrents/' + query + '/' + page + '.html');
    let html;
    try {
        html = await axios.get(url);
    } catch (error) {
        return null;
    }

    const $ = cheerio.load(html.data)

    $('.table tbody tr').each((i, element) => {

        if (i > 3) {
            let url = "https://www.torlock.com" + $(element).find('td').eq(0).find('div a').attr('href');
            ALLURL.push(url);
            let torrent = {
                'Name': $(element).find('td').eq(0).find('div a b').text().trim(),
                'Size': $(element).find('td').eq(2).text().trim(),
                'DateUploaded': $(element).find('td').eq(1).text().trim(),
                'Seeders': $(element).find('td').eq(3).text().trim(),
                'Leechers': $(element).find('td').eq(4).text().trim(),
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
                ALLTORRENT[i].Torrent = $("body > article > div:nth-child(6) > div > div:nth-child(2) > a").attr('href') || "";

            }
        }

    }))

    return ALLTORRENT;
}


module.exports = {
    torLock: torLock
}