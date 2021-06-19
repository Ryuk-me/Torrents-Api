const cheerio = require('cheerio');
const axios = require('axios');

async function torrentGalaxy(query = '', page = '0') {

    if(page !== '0'){
        try{
            page = Number(page) - 1;
        }catch{
            //
        }
    }
    const allTorrents = [];
    const url = "https://torrentgalaxy.to/torrents.php?search=" + query + "&sort=id&order=desc&page=" + page;
    let html;
    try{
        html = await axios.get(url);
    }catch{
        return null;
    }
    
    const $ = cheerio.load(html.data);

    $('div.tgxtablerow.txlight').each((i, element) => {
        const data = {};
        const posterRegex = /\bhttps?:[^)''"]+\.(?:jpg|jpeg|gif|png)(?![a-z])/g;
        try {
            data.Poster = ($(element).attr('onmouseover')).match(posterRegex)[0];
        } catch {
            data.Poster = "";
        }
        data.Category = $(element).find(":nth-child(1) a small").text();
        data.Name = $(element).find(":nth-child(4) div a b").text();
        data.Url = "https://torrentgalaxy.to" + $(element).find("a.txlight").attr('href');
        data.TorrentLink = $(element).find(".tgxtablecell.collapsehide.rounded.txlight a").attr("href");
        data.Magnet = $(element).find(".tgxtablecell.collapsehide.rounded.txlight a").next().attr("href");
        data.UploadedBy = $(element).find(':nth-child(7) span a span').text();
        data.Size = $(element).find(':nth-child(8)').text();
        data.Seeders = $(element).find(':nth-child(11) span font:nth-child(1)').text();
        data.Leechers = $(element).find(':nth-child(11) span font:nth-child(2)').text();
        data.DateUploaded = $(element).find(":nth-child(12)").text();
        allTorrents.push(data);
    })
    return allTorrents;
}
module.exports = torrentGalaxy