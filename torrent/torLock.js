const cheerio = require('cheerio');
const axios = require('axios');

async function torLock(query = '', page = '1') {

    const allTorrent = [];
    const url = encodeURI('https://www.torlock.com/all/torrents/' + query + '/' + page + '.html');
    let html;
    try {
        html = await axios.get(url);
    } catch (error) {
        return null;
    }

    const $ = cheerio.load(html.data)

    const links = $('tbody tr').map((i, element) => {
        if (i >= 5) {
            const link = 'https://www.torlock.com' + $(element).find('td').eq(0).find('div a').attr('href')
            return link;
        }

    }).get();


    await Promise.all(links.map(async (url) => {
        let html;
        try {
            html = await axios.get(url);
        } catch {
            return null;
        }
        const $ = cheerio.load(html.data);

        const name = $('dl.dl-horizontal').find('dd').eq(0).text().replace(/.torrent/gi, '').trim() || 'Not Available'
        const category = $('dl.dl-horizontal').find('dd').eq(1).text().trim() || ''
        const torrentFile = 'https://www.torlock.com' + $('div.well').find('a[href^="/tor"]').attr('href')
        const magnet = $('thead').find('a[href^="magnet"]').attr('href')
        const size = $('dl.dl-horizontal').find('dd').eq(3).text().trim().match(/.*B/gi)[0];
        const date = $('dl.dl-horizontal').find('dd').eq(4).text().trim().match(/\d(.-*?)\d/gi).join('')
        const uploader = $('dl.dl-horizontal').find('dd').eq(4).text().trim().match(/"(.*?)"/g)[0].split('\"')[1]
        const seeder = $('dl.dl-horizontal').find('dd').eq(5).text().split('&').map(i => i.trim().split(' '))[0][0]
        const peers = $('dl.dl-horizontal').find('dd').eq(5).text().split('&').map(i => i.trim().split(' '))[1][0]


        let torrent = {
            'Name': name,
            'Category': category,
            'Size': size,
            'UploadDate': date,
            'Seeds': seeder,
            'Peers': peers,
            'Uploader': uploader,
            'Torrent': torrentFile,
            'Url': url,
            'Magnet': magnet

        }
        allTorrent.push(torrent)
    }))

    return allTorrent
}


module.exports = {
    torLock: torLock
}