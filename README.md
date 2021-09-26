# Torrents Api ✨

> API for scraping torrents from 1337x, Piratebay, Eztv, Nyaasi, Torlock, YTS , Torrent Galaxy , Rarbg and Ettv
---
# How to install

```sh

# Clone the repo
$ git clone https://github.com/Ryuk-me/Torrents-Api

# Start the server
$ npm start

```
---

# How it works

```
$ /api/{website name}/{query}/{page(optional)}

```
---

## Keywords

Website | Keyword | Url | Example
------------ | ------------- | ------------- | -------------
1337x | 1337x | https://1337xx.to | [/api/1337x/avengers](https://torrents-api.ryukme.repl.co/api/1337x/avengers)
Yts   | yts | https://yts.mx | [/api/yts/avengers](https://torrents-api.ryukme.repl.co/api/yts/avengers)
Eztv  | eztv | https://eztv.re | [/api/eztv/avengers](https://torrents-api.ryukme.repl.co/api/eztv/avengers)
Torrent Galaxy | tgx | https://torrentgalaxy.to | [/api/tgx/avengers](https://torrents-api.ryukme.repl.co/api/tgx/avengers)
Torlock | torlock | https://www.torlock.com | [/api/torlock/avengers](https://torrents-api.ryukme.repl.co/api/torlock/avengers)
PirateBay | piratebay | https://thehiddenbay.com | [/api/piratebay/avengers](https://torrents-api.ryukme.repl.co/api/piratebay/avengers)
Nyaa.si | nyaasi | https://nyaa.si | [/api/nyaasi/umaru](https://torrents-api.ryukme.repl.co/api/nyaasi/umaru)
Rarbg | rarbg  | https://rargb.to | [/api/rarbg/avengers](https://torrents-api.ryukme.repl.co/api/rarbg/avengers)
Ettv | ettv  | https://www.ettvcentral.com | [/api/ettv/avengers](https://torrents-api.ryukme.repl.co/api/ettv/avengers)
all | all (it will retrieve torrent from every site) | | [/api/all/avengers](https://torrents-api.ryukme.repl.co/api/all/avengers)


### Example

```
$ /api/1337x/avengers
```

```json
[
  {
    "Name": "Avengers: Infinity War (2018) [BluRay] [720p] [YTS] [YIFY]",
    "Magnet": "magnet:?xt=urn:btih:EA17E6BE92962A403AC1C638D2537DCF1E564D26&dn=Avengers%3A+Infinity+War+%282018%29+%5BBluRay%5D+%5B720p%5D+%5BYTS%5D+%5BYIFY%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce",
    "Poster": "https://lx1.dyncdn.cc/cdn/ab/ab366d3d14d0af54fa6da1543a618251.jpg",
    "Category": "Movies",
    "Type": "HD",
    "Language": "English",
    "Size": "1.2 GB",
    "UploadedBy": " YTSAGx",
    "Downloads": "125311",
    "LastChecked": "2 years ago",
    "DateUploaded": "2 years ago",
    "Seeders": "8828",
    "Leechers": "4502",
    "Url": "https://1337x.to/torrent/3148366/Avengers-Infinity-War-2018-BluRay-720p-YTS-YIFY/"
  }
]
```
---
```
$ /api/tgx/avengers/1
```
```
[
  
    "Poster": "https://img.picturegalaxy.org/data/cover/h/W/hWOmQgIu5E.jpg",
    "Category": "Movies : HD",
    "Name": "Avengers.Endgame.2019.Open.Matte.Upscaled.BDRip.2160p.Eng.TrueHD.DD5.1.gerald99",
    "Url": "https://torrentgalaxy.to/torrent/14346596/Avengers-Endgame-2019-Open-Matte-Upscaled-BDRip-2160p-Eng-TrueHD-DD5-1-gerald99",
    "Torrent": "https://watercache.nanobytes.org/get/925d6bbd7faf6a3525aa3adcd0d8b560a671f3e6/Avengers.Endgame.2019.Open.Matte.Upscaled.BDRip.2160p.Eng.TrueHD.DD5.1.gerald99",
    "Magnet": "magnet:?xt=urn:btih:925d6bbd7faf6a3525aa3adcd0d8b560a671f3e6&dn=Avengers.Endgame.2019.Open.Matte.Upscaled.BDRip.2160p.Eng.TrueHD.DD5.1.gerald99&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ffasttracker.foreverpirates.co%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.uw0.xyz%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce",
    "UploadedBy": "gerald99",
    "Size": "34.62 GB",
    "Seeders": "6",
    "Leechers": "7",
    "DateUploaded": "10/04/21 10:46"
  }
 
 ]
```
---

```
$ /api/nyaasi/jujutsu kaisen/2
```
```json
[
  {
    "Category": "Anime - English-translated",
    "Name": "[ok] JUJUTSU KAISEN - 01 [Multi-Subs] [1080p].mkv",
    "Url": "https://nyaa.si/view/1285645",
    "Torrent": "https://nyaa.si/download/1285645.torrent",
    "Size": "1.4 GiB",
    "DateUploaded": "2020-10-02 17:48",
    "Seeders": "25",
    "Leechers": "0",
    "Downloads": "710",
    "Magnet": "magnet:?xt=urn:btih:986f957243b697d238108d1fa0ba1d0de6d602aa&dn=%5Bok%5D%20JUJUTSU%20KAISEN%20-%2001%20%5BMulti-Subs%5D%20%5B1080p%5D.mkv&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce"
  }
]
```
---
## Want to Try api ?

```
https://torrents-api.ryukme.repl.co/api/{website}/{query}/{page(optional)}
```
```
https://torrents-api.ryukme.repl.co/api/nyaasi/jujutsu kaisen/2
```
---
#### You can fork the repo and deploy on VPS or deploy it on Heroku :)  

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

---
