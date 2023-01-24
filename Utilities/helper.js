const puppeteer = require('puppeteer');

const getTimeFromPerformanceMetrics = (perfMetrics, metricName) => {
    const metric = perfMetrics.metrics.find(m => m.name === metricName);
    return metric ? metric.value : 0;
};

const extractDataFromPerformanceMetrics = (perfMetrics, ...metricNames) => {
    const extractedData = {};
    metricNames.forEach(name => {
        extractedData[name] = getTimeFromPerformanceMetrics(perfMetrics, name);
    });
    return extractedData;
};

module.exports = { getTimeFromPerformanceMetrics, extractDataFromPerformanceMetrics };
