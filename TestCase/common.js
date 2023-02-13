const puppeteer = require('puppeteer');

const launchBrowser = async (url) => {
  const browser = await puppeteer({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(url);
  return {browser, page};
}

module.exports = {launchBrowser};
