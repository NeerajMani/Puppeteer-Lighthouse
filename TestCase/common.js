const puppeteer = require('puppeteer');

const launchBrowser = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  return {browser, page};
}

module.exports = {launchBrowser};
