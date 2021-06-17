const cheerio = require('cheerio');
const axios = require('axios');


async function nyaaSI(query, page = '1') {
    let torrents = [];
    const url = 'https://nyaa.si/?f=0&c=0_0&q=' + query + '&p=' + page;
    let html = null;
    try {
        html = await axios.get(url);
    } catch {
        return null;
    }
    const regex = /.comments/gi;
    const nameRegex = /[a-zA-Z\W].+/g;

    const $ = cheerio.load(html.data);

    $('tbody tr').each((_, element) => {

        const data = {}

        const $find = $(element);
        $find.each((_, element) => {
            const td = $(element).children('td');
            data.Category = $(element).find('a').attr('title')
            data.Name = $(element).find('td[colspan="2"] a').text().trim().match(nameRegex)[0]
            data.Url = ('https://nyaa.si' + $(element).find('td[colspan="2"] a').attr('href')).replace(regex, '')

            $find.each((_, element) => {
                data.TorrentLink = 'https://nyaa.si' + $(element).find('.text-center a').attr('href')
                data.Size = $(td).eq(3).text();
                data.Date = $(td).eq(4).text();
                data.Seeder = $(td).eq(5).text();
                data.Leecher = $(td).eq(6).text();
                data.Downloads = $(td).eq(7).text();
                data.Magnet = $(element).find('.text-center a').next().attr('href')
            })

        });
        torrents.push(data);

    });

    return torrents
}

module.exports = {
    nyaaSI: nyaaSI
}