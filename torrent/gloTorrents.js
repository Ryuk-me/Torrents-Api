const cheerio = require('cheerio')
const axios = require('axios')


async function glodls(query, page = '0') {
    var ALLTORRENT = [];
    const url = `https://glodls.to/search_results.php?search=${query}&sort=seeders&order=desc&page=${page}`;
    let html;
    try {
        html = await axios.get(url, headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
        });

    } catch {
        return null;
    }

    const $ = cheerio.load(html.data);


    $('.ttable_headinner tr').each((_, element) => {


        let torrent = {
            'Name': $(element).find('td').eq(1).find('a').text().trim(),
            'Size': $(element).find('td').eq(4).text(),
            'UploadedBy' : $(element).find('td').eq(7).find('a b font').text(),
            'Seeders': $(element).find('td').eq(5).find('font b').text(),
            'Leechers': $(element).find('td').eq(6).find('font b').text(),
            'Url': "https://glodls.to" + $(element).find('td').eq(1).find('a').next().attr('href'),
            'Torrent': "https://glodls.to" + $(element).find('td').eq(2).find('a').attr('href'),
            'Magnet': $(element).find('td').eq(3).find('a').attr('href'),
        }
        if (torrent.Name !== '') {
            ALLTORRENT.push(torrent);
        }
    })
    return ALL
}
module.exports = glodls