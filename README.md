# Torrents Api ✨

> API for scraping torrents from 1337x, Piratebay, Eztv, Nyaasi, Torlock and YTS

# How to install

``` bash

# Clone the repo
$ git clone https://github.com/Ryuk-me/Torrents-Api

# Start the server
$ npm start

```

# How it works

```
$ /api/{website name}/{query}/{page(optional)}

```
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
```
$ /api/nyaasi/jujutsu kaisen/2
```
```json
[
  {
    "Category": "Anime - English-translated",
    "name": "[ok] JUJUTSU KAISEN - 01 [Multi-Subs] [1080p].mkv",
    "Url": "https://nyaa.si/view/1285645",
    "TorrentLink": "https://nyaa.si/download/1285645.torrent",
    "Size": "1.4 GiB",
    "Date": "2020-10-02 17:48",
    "Seeder": "25",
    "Leecher": "0",
    "Downloads": "710",
    "Magnet": "magnet:?xt=urn:btih:986f957243b697d238108d1fa0ba1d0de6d602aa&dn=%5Bok%5D%20JUJUTSU%20KAISEN%20-%2001%20%5BMulti-Subs%5D%20%5B1080p%5D.mkv&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce"
  }
]
```

## Want to Try api ?

```
https://t0rr3nt-api.herokuapp.com/api/{website}/{query}/{page(optional)}
```
```
https://t0rr3nt-api.herokuapp.com/api/nyaasi/jujutsu%20kaisen/2
```

# Deploy
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
