const cheerio = require('cheerio')
const axios = require('axios')

async function magnet_dl(query, page = '1') {
    var ALLTORRENT = [];
    const url = `https://magnetdl.unblockninja.com/search/?q=${query}&m=${page}`;
    let html;
    try {
        html = await axios.get(url, headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
        });

    } catch {
        return null;
    }

    const $ = cheerio.load(html.data);

    $('.download tbody tr').each((_, element) => {


        let torrent = {
            'Name': $(element).find('td').eq(1).find('a').text().trim(),
            'Size': $(element).find('td').eq(5).text(),
            'DateUploaded': $(element).find('td').eq(2).text(),
            'Category': $(element).find('td').eq(3).text(),
            'Seeders': $(element).find('td').eq(6).text(),
            'Leechers': $(element).find('td').eq(7).text(),
            'Url': "https://www.magnetdl.com" + $(element).find('td').eq(1).find('a').attr('href'),
            'Magnet': $(element).find('td').eq(0).find('a').attr('href'),
        }
        if (torrent.Name !== '') {
            ALLTORRENT.push(torrent);
        }
    })
    return ALLTORRENT;
}

module.exports = magnet_dl
