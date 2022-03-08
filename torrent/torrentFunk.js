const cheerio = require('cheerio')
const axios = require('axios')

async function torrentFunk(query, page=1) {
    var ALLTORRENT = [];
    var ALLURL = [];
    
    if (page === '' || page === '1') {
        var url = 'https://www.torrentfunk.com/all/torrents/' + query + '.html'
    } else {
        var url = 'https://www.torrentfunk.com/all/torrents/' + query + '/' + page + '.html'
    }

    let html;
    try {
        html = await axios.get(url, headers = {
            "User-Agent": "Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.87 Mobile Safari/537.36"
        });

    } catch {
        return null;
    }

    const $ = cheerio.load(html.data);

    $('.tmain tbody tr').each((i, element) => {

        if (i > 4) {
            let url = "https://www.torrentfunk.com" + $(element).find('td').eq(0).find('a').attr('href');
            ALLURL.push(url);
            let torrent = {
                'Name': $(element).find('td').eq(0).find('a').text().trim(),
                'Size': $(element).find('td').eq(2).text(),
                'DateUploaded': $(element).find('td').eq(1).text(),
                'Uploader': $(element).find('td').eq(5).text(),
                'Seeders': $(element).find('td').eq(3).text(),
                'Leechers': $(element).find('td').eq(4).text(),
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
                        "User-Agent": "Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.87 Mobile Safari/537.36"
                    });
                } catch {
                    return;
                }
                const $ = cheerio.load(html.data);
                ALLTORRENT[i].Torrent = $('#right > main > div.content > table:nth-child(3) > tbody > tr > td:nth-child(2) > a').attr('href');

            }
        }

    }))

    return ALLTORRENT;
}
module.exports = torrentFunk;
