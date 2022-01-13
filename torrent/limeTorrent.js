const cheerio = require('cheerio')
const axios = require('axios')


async function limeTorrent(query, page = '1') {
    var ALLTORRENT = [];
    const url = `https://www.limetorrents.pro/search/all/${query}/seeds/${page}/`;
    let html;
    try {
        html = await axios.get(url, headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
        });

    } catch {
        return null;
    }

    const $ = cheerio.load(html.data);

    $('.table2 tbody tr').each((i, element) => {
        if (i > 0) {
            let category_and_age = $(element).find('td').eq(1).text().trim();
            category_and_age = category_and_age.split('-');
            let age = category_and_age[0].trim();
            let category = category_and_age[1].replace('in', '').trim();
            let torrent = {
                "Name": $(element).find('div.tt-name').text().trim(),
                "Size": $(element).find('td').eq(2).text().trim(),
                "Category": category,
                "Age": age,
                "Seeders": $(element).find('td').eq(3).text().trim(),
                "Leechers": $(element).find('td').eq(4).text().trim(),
                "Torrent": $(element).find('div.tt-name a').attr('href'),
                "Url": "https://www.limetorrents.pro" + $(element).find('div.tt-name a').next().attr('href')
            }
            ALLTORRENT.push(torrent);
        }

    })
    return ALLTORRENT;

}
module.exports = limeTorrent