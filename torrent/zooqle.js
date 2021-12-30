const cheerio = require('cheerio')
const axios = require('axios')


async function zooqle(query = '', page = '1') {
    var ALLTORRENT = [];
    const url = "https://zooqle.com/search?pg=" + page + "&q=" + query;
    let html;
    try {
        html = await axios.get(url, headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
        });

    } catch {
        return null;
    }

    const $ = cheerio.load(html.data);


    $('tbody tr').each((_, element) => {
        let seeders_leechers = $(element).find('td').eq(5).find('div').attr('title').trim().split('|');
        let seeders = seeders_leechers[0].replace('Seeders:', '').trim();
        let leechers = seeders_leechers[1].replace('Leechers:', '').trim();

        let torrent = {
            'Name': $(element).find('td').eq(1).find('a').text().trim(),
            'Size': $(element).find('td').eq(3).find('div div').text().trim(),
            'DateUploaded': $(element).find('td').eq(4).text().trim(),
            'Seeders': seeders,
            'Leechers': leechers,
            'Url': "https://zooqle.com" + $(element).find('td').eq(1).find('a').attr('href'),
            'Magnet': $(element).find('td').eq(2).find('ul').find('li').eq(1).find('a').attr('href')
        }
        ALLTORRENT.push(torrent);
    })
    return ALLTORRENT;
}

module.exports = {
    zooqle: zooqle
}