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
    let comboTorrent = []
    await Promise.all([
            torrentGalaxy(query, page),
            scrapNyaa.nyaaSI(query, page),
            scrapYts.yts(query, page),
            scrapPirateBay.pirateBay(query, page),
            scrapTorLock.torLock(query, page),
            scrapEzTVio.ezTV(query),
            scrap1337x.torrent1337x(query, page),
            rarbg(query, page),
            zooqle.zooqle(query, page),
            kickAss(query, page),
            bitSearch(query, page),
            glodls(query, page),
            magnet_dl(query, page),
            limeTorrent(query, page),
            torrentFunk(query, page),
            torrentProject(query, page)

        ])
        .then(([tgx, nyaasi, yts, piratebay, torlock, eztv, x1337, rarbg, zql, kick, bts, glo, mg_dl, lmt, tfk, tpj]) => {

            if (tgx !== null && tgx.length > 0) {
                comboTorrent.push(tgx);
            }
            if (nyaasi !== null && nyaasi.length > 0) {
                comboTorrent.push(nyaasi);
            }
            if (yts !== null && yts.length > 0) {
                comboTorrent.push(yts);
            }
            if (piratebay !== null && piratebay.length > 0) {
                comboTorrent.push(piratebay);
            }
            if (torlock !== null && torlock.length > 0) {
                comboTorrent.push(torlock);
            }
            if (eztv !== null && eztv.length > 0) {
                comboTorrent.push(eztv);
            }
            if (x1337 !== null && x1337.length > 0) {
                comboTorrent.push(x1337);
            }
            if (rarbg !== null && rarbg.length > 0) {
                comboTorrent.push(rarbg);
            }
            if (zql !== null && zql.length > 0) {
                comboTorrent.push(zql);
            }
            if (kick !== null && kick.length > 0) {
                comboTorrent.push(kick);
            }
            if (bts !== null && bts.length > 0) {
                comboTorrent.push(bts);
            }
            if (glo !== null && glo.length > 0) {
                comboTorrent.push(glo);
            }
            if (mg_dl !== null && mg_dl.length > 0) {
                comboTorrent.push(mg_dl);
            }
            if (lmt !== null && lmt.length > 0) {
                comboTorrent.push(lmt);
            }
            if (tfk !== null && tfk.length > 0) {
                comboTorrent.push(tfk);
            }
            if (tpj !== null && tpj.length > 0) {
                comboTorrent.push(tpj);
            }
        })
    return comboTorrent;
}
module.exports = combo;