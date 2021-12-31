const cheerio = require('cheerio')
const axios = require('axios')


async function bitSearch(query, page = '1') {
    var ALLTORRENT = [];
    const url = "https://bitsearch.to/search?q=" + query + "&page=" + page + "&sort=seeders";
    let html;
    try {
        html = await axios.get(url, headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
        });

    } catch {
        return null;
    }

    const $ = cheerio.load(html.data);


    $('div.search-result.view-box').each((_, element) => {
        let torrent = {
            'Name': $(element).find('.info h5 a').text().trim(),
            'Size': $(element).find('.info div div').eq(2).text().trim(),
            'Downloads': $(element).find('.info div div').eq(1).text().trim(),
            'Seeders': $(element).find('.info div div').eq(3).text().trim(),
            'Leechers': $(element).find('.info div div').eq(4).text().trim(),
            'DateUploaded': $(element).find('.info div div').eq(5).text().trim(),
            'Url': "https://bitsearch.to" + $(element).find('.info h5 a').attr('href'),
            'TorrentLink': $(element).find('.links a').attr('href'),
            'Magnet': $(element).find('.links a').next().attr('href'),
        }
        ALLTORRENT.push(torrent);
    })

    return ALLTORRENT;
}


module.exports = bitSearch;