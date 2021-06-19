const cheerio = require('cheerio')
const axios = require('axios')

async function pirateBay(query, page = '1') {

    const allTorrents = [];
    const url = 'https://thehiddenbay.com/search/' + query + '/' + page + '/99/0';
    let html;
    try {
        html = await axios.get(url);
    } catch {
        return null;
    }
    const $ = cheerio.load(html.data)

    $("table#searchResult tr").each((_, element) => {
        const data = $(element).find('font.detDesc').text().replace(/(Size|Uploaded)/gi, '').replace(/ULed/gi, 'Uploaded').split(',').map(value => value.trim());
        const date = data[0]
        const size = data[1]
        const uploader = data[2]

        const torrent = {
            Name: $(element).find('a.detLink').text(),
            Size: size,
            DateUploaded: date,
            Category: $(element).find('td.vertTh center a').eq(0).text(),
            Seeders: $(element).find('td').eq(2).text(),
            Leechers: $(element).find('td').eq(3).text(),
            Uploader: uploader,
            Link: $(element).find('a.detLink').attr('href'),
            Magnet: $(element).find("td div.detName").next().attr('href')
        }

        if (torrent.Name.length) {
            allTorrents.push(torrent)
        }
    })

    return allTorrents
}

module.exports ={
    pirateBay : pirateBay
}