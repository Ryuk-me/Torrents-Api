const express = require('express');
const scrap1337x = require('./torrent/1337x')
const scrapNyaa = require('./torrent/nyaaSI')
const scrapYts = require('./torrent/yts')
const scrapPirateBay = require('./torrent/pirateBay')
const scrapTorLock = require('./torrent/torLock')
const scrapEzTVio = require('./torrent/ezTV')


const app = express();

app.use('/api/:website/:query/:page?', (req, res, next) => {

    let website = (req.params.website).toLowerCase();
    let query = req.params.query
    let page = req.params.page

    if (website === '1337x') {
        if (page > 50) {
            return res.json({
                error: 'Please enter page  value less than 51 to get the result :)'
            })
        } else {
            scrap1337x.torrent1337x(query, page)
                .then((data) => {
                    if (data.length === 0) {
                        return res.json({
                            error: 'No search result available for query (' + query + ') please change query or page value'
                        })
                    } else {
                        return res.send(data);
                    }

                })
        }
    }
    if (website === 'yts') {
        scrapYts.yts(query, page)
            .then((data) => {
                if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }

            })
    }
    if (website === 'eztv') {
        scrapEzTVio.ezTV(query)
            .then((data) => {
                if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }

            })
    }
    if (website === 'torlock') {
        scrapTorLock.torLock(query, page)
            .then((data) => {
                if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }

            })
    }
    if (website === 'piratebay') {
        scrapPirateBay.pirateBay(query, page)
            .then((data) => {
                if (data.length === 0) {
                    return res.json({
                        error: 'No search result available for query (' + query + ')'
                    })
                } else {
                    return res.send(data);
                }

            })
    }
    if (website === 'nyaasi') {
        if (page > 14) {
            return res.json({
                error: '14 is the last page'
            })
        } else {
            scrapNyaa.nyaaSI(query, page)
                .then((data) => {
                    if (data.length === 0) {
                        return res.json({
                            error: 'No search result available for query (' + query + ')'
                        })
                    } else {
                        return res.send(data);
                    }

                })
        }

    } else if (website !== 'nyaasi' && website !== '1337x' && website !== 'yts' && website !== 'piratebay' && website !== 'torlock' && website !== 'eztv') {
        return res.json({
            error: 'please select 1337x | nyaasi | yts'
        })
    }

});

app.use('/', (req, res) => {
    res.send('<h1>Welcome to 1337x, NyaaSi, YTS, PirateBay, Torlock and EzTvio Unoffical API</h1>');
});

app.listen(3000);