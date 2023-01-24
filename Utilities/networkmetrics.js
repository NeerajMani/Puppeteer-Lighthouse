const puppeteer = require('puppeteer');

const getNetworkMetrics = async (page) => {
    const client = await page.target().createCDPSession();
    await client.send('Network.enable');
    const networkMetrics = await client.send('Network.getAllCookies');
    return networkMetrics;
}

const getTraceMetrics = async (page) => {
    await page.tracing.start({path: 'trace.json', categories: ['devtools.timeline']});
    await page.goto(page.url());
    await page.tracing.stop();
    // use chrome-trace-event library to parse the trace file
}


module.exports = {getNetworkMetrics, getTraceMetrics};
