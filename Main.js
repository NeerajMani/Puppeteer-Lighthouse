const {launchBrowser} = require('./TestCase/common');
const {getPerformanceMetrics} = require('./Utilities/PerformanceMetrics');
//const {NewPerformanceMetrics} = require('./Utilities/PerformanceMetrics');
const {getNetworkMetrics, getTraceMetrics} = require('./Utilities/networkmetrics');
const {getLighthouseMetrics} = require('./Utilities/lighthouse');
const { formatMetrics } = require('./Utilities/metrics-formatter');

(async () => {
  const {browser, page} = await launchBrowser('https://www.amazon.in/');
  const performanceMetrics = await getPerformanceMetrics(page);
  const networkMetrics = await getNetworkMetrics(page);
  const traceMetrics = await getTraceMetrics(page);
  //const newPerformanceMetrics = await NewPerformanceMetrics(page);
  const lighthouseMetrics = await getLighthouseMetrics(page.url(), browser, {disableStorageReset: true});
  const metrics = {
    PageName: 'Launch Page',
    url: page.url(),
    //Performance_Metrics:formatMetrics(newPerformanceMetrics),
    PerformanceMetrics : formatMetrics(performanceMetrics),
    Network_Metrics:formatMetrics(networkMetrics),
    Trace_Metrics:formatMetrics(traceMetrics),
    Lighthouse_Metrics:formatMetrics(lighthouseMetrics)
    
}
console.log({metrics});
  await browser.close();
})();
