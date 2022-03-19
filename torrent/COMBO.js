const scrap1337x = require('./1337x');
const scrapNyaa = require('./nyaaSI');
const scrapYts = require('./yts');
const scrapPirateBay = require('./pirateBay');
const scrapTorLock = require('./torLock');
const scrapEzTVio = require('./ezTV');
const torrentGalaxy = require('./torrentGalaxy');
const rarbg = require('./rarbg');
const zooqle = require('./zooqle');
const kickAss = require('./kickAss');
const bitSearch = require('./bitSearch');
const glodls = require('./gloTorrents');
const magnet_dl = require('./magnet_dl');
const limeTorrent = require('./limeTorrent');
const torrentFunk = require('./torrentFunk');
const torrentProject = require('./torrentProject');

async function combo(query, page) {
    let comboTorrent = [], timeout = 10000 //wait time before rejecting promised results
    await Promise.allSettled([

        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(scrap1337x.torrent1337x(query, page)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(scrapYts.yts('query', 1)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(limeTorrent(query, page)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(torrentGalaxy(query, page)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(rarbg(query, page)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(zooqle.zooqle(query, page)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(kickAss(query, page)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(scrapTorLock.torLock(query, page)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(scrapNyaa.nyaaSI(query, page)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(bitSearch(query, page)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(scrapEzTVio.ezTV(query)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(scrapPirateBay.pirateBay(query, page)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(magnet_dl(query, page)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(torrentFunk(query, page)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(glodls(query, page)))
        ]),
        Promise.race([new Promise((_, reject) => (
            setTimeout(() => {
                reject({code: 408, message: 'Timeout exceeded'})
            }, timeout))),
            new Promise((resolve, _) => resolve(torrentProject(query, page)))
        ])])
        .then((comboResult) => {
            comboTorrent = (comboResult.filter((element) =>
                element.status === 'fulfilled' && element.value && element.value.length > 0)).map((element) => {
                return element.value
            })
        })
        .catch(err => console.log(err))

    return comboTorrent;
}

module.exports = combo;