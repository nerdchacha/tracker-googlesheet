require('dotenv').config();
const File = require('./src/file');
const Dom = require('./src/dom');
const GoogleSheet = require('./src/gooleSheet');


(async function () {
  const file = new File();
  const pagesFile = await file.readFile('./input.txt');
  const pages = pagesFile.trim().split('\n');
  const trackerFile = await file.readFile('./tracker.txt');
  const trackers = trackerFile.trim().split('\n');
  const dom = new Dom();
  const pagesHtmlRequests = pages.map((page) => dom.loadPage(page));
  const pagesHtml = await Promise.all(pagesHtmlRequests);
  const googleSheet = new GoogleSheet();
  pagesHtml.forEach((pageHtml, i) => {
    trackers.forEach((tracker) => {
      googleSheet.addRow(pages[i], tracker, pageHtml.includes(tracker));
    });
  });
})()