const { launchBrowser } = require('./TestCase/common');
const { getPerformanceMetrics } = require('./Utilities/PerformanceMetrics');
const captureMetrics = require('./Utilities/captureMetrics');
const StopWatch = require('./Utilities/measureElapsedTime');
const {getLighthouseMetrics} = require('./Utilities/lighthouse');

(async () => {
  const { browser, page } = await launchBrowser('https://www.flipkart.com/');  
  // Start stopwatch to measure page load time
  const sw = new StopWatch();
  sw.start();
  // Get the performance metrics
  const perfObjectNew = await getPerformanceMetrics(page);
  // Perform some action on the page
  
  // Get the updated performance metrics
  const perfObjectOld = await getPerformanceMetrics(page);
  sw.stop();
  // Get the client for sending CDP commands
  const client = await page.target().createCDPSession();
  // Capture the metrics
  const allPageMetrics = await captureMetrics('LaunchPage', perfObjectNew, perfObjectOld, sw, page, client);
  const lighthouseMetrics = await getLighthouseMetrics(page.url(), browser, {disableStorageReset: true});

  console.log(allPageMetrics);
  console.log(lighthouseMetrics);
  // Close the browser
  await browser.close();
})();
