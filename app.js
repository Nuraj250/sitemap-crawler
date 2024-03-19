const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const Crawler = require("simplecrawler");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('.'));

console.log("Server setup completed.");

app.post('/crawl', (req, res) => {
    console.log("Received crawl request.");
    const startUrl = req.body.startUrl;
    console.log(`Starting URL: ${startUrl}`);

    let crawledUrls = [];
    let failedcrawledUrls = [];

    let crawler = new Crawler(startUrl);
    console.log("Crawler initialized.");

    crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
        crawledUrls.push(queueItem.url);
    });

    crawler.on("fetcherror", function(queueItem, response) {
        failedcrawledUrls.push(queueItem.url);
       });

    crawler.on("fetch404", function(queueItem, response) {
        failedcrawledUrls.push(queueItem.url);
       });

    crawler.on("fetch5xx", function(queueItem, response) {
        failedcrawledUrls.push(queueItem.url);
   });

    crawler.maxConcurrency = 5;
    crawler.maxDepth = 3;
    crawler.userAgent = 'Mozilla/5.0 (compatible; MyCrawler/1.0; +http://example.com/bot)';

    crawler.on("complete", function() {
        console.log("Crawling complete!");
        res.json({ message: 'Crawling completed successfully.', urls: crawledUrls ,failedcrawledurls: failedcrawledUrls });
    });

    crawler.start();
    console.log("Crawler started.");

    console.log("Crawling in progress... (This operation will continue in the background)");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
