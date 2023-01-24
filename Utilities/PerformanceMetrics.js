const puppeteer = require('puppeteer');

const getPerformanceMetrics = async (page) => {
    const client = await page.target().createCDPSession();
    await client.send('Performance.enable');
    const { metrics } = await client.send('Performance.getMetrics');
    const performanceMetrics = {};
    metrics.forEach(metric => {
        performanceMetrics[metric.name] = metric.value;
    });

    // check if NavigationStart and Timestamp exists and are numbers
    if (performanceMetrics.NavigationStart && performanceMetrics.Timestamp &&
        typeof performanceMetrics.NavigationStart === 'number' && typeof performanceMetrics.Timestamp === 'number') {

            const loadTime = (performanceMetrics.Timestamp - performanceMetrics.NavigationStart) / 1000;
            performanceMetrics.loadTime = loadTime;
    }
    return performanceMetrics;
}

// const NewPerformanceMetrics = async (page) => {
//     const client = await page.target().createCDPSession();
//     await client.send('Performance.enable');
//     const { metrics } = await client.send('Performance.getMetrics');
  
//     const firstContentfulPaintMetric = metrics.find(m => m.name === 'FirstContentfulPaint');
//     const firstContentfulPaint = firstContentfulPaintMetric ? firstContentfulPaintMetric.value : 0;
//     const loadEventEnd = metrics.find(m => m.name === 'LoadEventEnd').value;
//     const firstInteractive = metrics.find(m => m.name === 'first-interactive').value;
//     const speedIndex = metrics.find(m => m.name === 'speed-index').value;
//     const totalBlockingTime = metrics.find(m => m.name === 'total-blocking-time').value;
//     const layoutShift = metrics.find(m => m.name === 'layout-shift').value;
//     const largestContentfulPaint = metrics.find(m => m.name === 'largest-contentful-paint').value;
//     const responseStart = metrics.find(m => m.name === 'responseStart').value;
//     const domContentLoaded = metrics.find(m => m.name === 'domContentLoaded').value;
//     const loadEvent = metrics.find(m => m.name === 'loadEvent').value;
//     const navigationStart = metrics.find(m => m.name === 'NavigationStart').value;
//     const pageLoadTime = loadEventEnd - navigationStart;
//     const loadTimeInSeconds = (pageLoadTime / 1000).toFixed(2);
    
//     return {firstContentfulPaint, loadEventEnd, firstInteractive, speedIndex, totalBlockingTime, layoutShift, largestContentfulPaint, responseStart, domContentLoaded, loadEvent,loadTimeInSeconds};
//   }

module.exports = { getPerformanceMetrics };
