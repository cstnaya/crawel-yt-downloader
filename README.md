Crawler by Puppeteer and Cheerio
================================

## Tools:
1. [Puppeteer](https://pptr.dev/)
2. [Cherrio](https://github.com/cheeriojs/cheerio/wiki/Chinese-README#%E5%8A%A0%E8%BD%BD) (In fact I give up using it in the end.)
3. [ytdl-core](https://www.npmjs.com/package/ytdl-core)

## Feature
1. Search youtube video list from someone's channel.
2. Download videos by `ytdl` package. (unfinished)

## setup
1. Use `npm ci` to install dependency packages.
2. Enter `node index.js` for demo.

##　How to make it
1. The first thing, u need to use puppeteer to crawl a youtube website.
2. Then use puppeteer or cherrio api to convert fetched DOM string to DOM element (node).
3. Since youtube use `scroll-infinite` tech to handle pagination, so you need to simulate scrolling down the window.
4. Download videos you fetched.
5. Back to step 1. and repeat whole the flow until you got all videos.