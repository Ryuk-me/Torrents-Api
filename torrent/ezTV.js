const cheerio = require('cheerio');
const axios = require('axios');


async function ezTV(query) {
    let allTorrents = [];
    const url = 'https://eztv.re/search/' + query;
    let html;
    try {
        html = await axios.get(url);
    } catch{
        return null;
    }

    const $ = cheerio.load(html.data)

    $('tbody tr').each((_, element) => {

        const url = $(element).find('td').eq(1).find('a').attr('href') || ''
        const name = $(element).find('td').eq(1).find('a').text() || ''
        if (url !== '' || name !== '') {
            let torrent = {
                'Name': name,
                'Size': $(element).find('td').eq(3).text(),
                'Date': $(element).find('td').eq(4).text(),
                'Seeds': $(element).find('td').eq(5).text() || '',
                'Url': "https://eztv.io" + url,
                'Torrent': $(element).find('td').eq(2).find('a').eq(1).attr('href'),
                'Magnet': $(element).find('td').eq(2).find('a').attr('href')
            }
            allTorrents.push(torrent)
        }
    })

    return allTorrents
}

module.exports = {
    ezTV: ezTV
}
