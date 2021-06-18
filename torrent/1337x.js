const cheerio = require('cheerio');
const axios = require('axios');



async function torrent1337x(query = '', page = '1') {

    const allTorrent = [];
    let html;
    const url = 'https://1337xx.to/search/' + query + '/' + page + '/';
    try{
        html = await axios.get(url);
    }catch{
        return null;
    }

    const $ = cheerio.load(html.data)

    const links = $('td.name').map((_, element) => {
        var link = 'https://1337xx.to' + $(element).find('a').next().attr('href');
        return link;

    }).get();


    await Promise.all(links.map(async (element) => {

        const data = {};
        const labels = ['Category', 'Type', 'Language', 'Size', 'UploadedBy', 'Downloads', 'LastChecked', 'DateUploaded', 'Seeders', 'Leechers'];
        let html;
        try{
            html = await axios.get(element);
        }catch{
            return null;
        }
        const $ = cheerio.load(html.data);
        data.Name = $('.box-info-heading h1').text().trim();
        data.Magnet = $('.clearfix ul li a').attr('href') || "";
        const poster = ("https:" + $('div.torrent-image img').attr('src'));
        
        if (poster !== 'https:undefined') {
            data.Poster = poster
        } else {
            data.Poster = ''
        }

        $('div .clearfix ul li > span').each((i, element) => {
            $list = $(element);
            data[labels[i]] = $list.text();
        })
        data.Url = element

        allTorrent.push(data)
    }))

    return allTorrent
}
module.exports = {
    torrent1337x: torrent1337x
}