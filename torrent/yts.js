const cheerio = require('cheerio');
const axios = require('axios');


async function yts(query, page) {

    const allTorrent = []

    if (page === '' || page === '1') {
        var url = 'https://yts.mx/browse-movies/' + query + '/720p/all/0/latest/0/all?page='
    } else {
        var url = 'https://yts.mx/browse-movies/' + query + '/720p/all/0/latest/0/all?page=' + page
    }

    const html = await axios.get(url)
    const $ = cheerio.load(html.data)
    const div = $('div.browse-movie-bottom')
    const links = div.find('a').map((i, element) => {
        const link = $(element).attr('href');
        return link
    }).get();

    const labels = ['Dwnload1', 'Download2', 'Download3']
    await Promise.all(links.map(async (element) => {
        const data = {}
        const html = await axios.get(element);
        const $ = cheerio.load(html.data);

        data['Name'] = $('div.hidden-xs').find('h1').text();
        data['ReleasedDate'] = $('div.hidden-xs').find('h2').eq(0).text();
        data['Genre'] = $('div.hidden-xs').find('h2').eq(1).text();
        data['Rating'] = (($('div.bottom-info div.rating-row').eq(3).find('span').eq(0).text()) + ' ⭐').trim() || 'Not Rated'
        data['Likes'] = $('div.bottom-info div.rating-row').eq(0).find('span').eq(1).text()
        data['Runtime'] = $('div .tech-spec-info').find('div .row').eq(1).find('div .tech-spec-element').eq(2).text().trim();
        data['Language'] = $('div .tech-spec-info').find('div .row').eq(0).find('div .tech-spec-element').eq(2).text().trim();
        data['Url'] = element;
        data['Poster'] = $('div #movie-poster').eq(0).find('img').attr('src');

        $('div #movie-info p.hidden-xs a').each((i, element) => {
            data[labels[i]] = $(element).attr('href')
        })

        clean(data);
        allTorrent.push(data);
    }))

    return allTorrent;
}

function clean(obj) {
    for (var propName in obj) {
        if (String(obj[propName]).startsWith('https://yifysubtitles') === true || obj[propName] === '' || obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj
}


module.exports = {
    yts: yts
}