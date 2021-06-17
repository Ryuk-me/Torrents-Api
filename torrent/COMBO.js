const scrap1337x = require('./1337x');
const scrapNyaa = require('./nyaaSI');
const scrapYts = require('./yts');
const scrapPirateBay = require('./pirateBay');
const scrapTorLock = require('./torLock');
const scrapEzTVio = require('./ezTV');
const torrentGalaxy = require('./torrentGalaxy');


async function combo(query, page) {
    let comboTorrent = []
    await torrentGalaxy(query, page)
        .then((data) => {
            if(data !== null && data.length !==0){
                comboTorrent.push(data)
            }

        })
    await scrapPirateBay.pirateBay(query, page)
        .then((data) => {
            if(data !== null && data.length !==0){
                comboTorrent.push(data)
            }
        })
    await scrapTorLock.torLock(query, page)
        .then((data) => {
            if(data !== null && data.length !==0){
                comboTorrent.push(data)
            }

        })
    await scrapEzTVio.ezTV(query)
        .then((data) => {
            if(data !== null && data.length !==0){
                comboTorrent.push(data)
            }
        })
    await scrap1337x.torrent1337x(query, page)
        .then((data) => {
            if(data !== null && data.length !==0){
                comboTorrent.push(data)
            }
        })
        return comboTorrent;
}

module.exports = combo;