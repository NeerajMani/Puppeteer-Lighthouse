const {
    getTimeFromPerformanceMetrics,
    extractDataFromPerformanceMetrics,
} = require('./helper');

async function getPageMetrics (page, diffObject, perfMetrics){

    //Capture windows metrics
    var navObj = JSON.parse(await page.evaluate( () => JSON.stringify(window.performance)));
    var timing = navObj["timing"];
    var responseTime=timing["responseEnd"]-timing["navigationStart"];
    var loadingTime =timing["loadEventEnd"]-timing["loadEventStart"];
    var domInteractive=timing["domInteractive"]-timing["navigationStart"];
    var domProcessionTime = timing["domComplete"]-timing["domLoading"];
    var totalNavTime = timing ["loadEventEnd"]-timing["navigationStart"];

    diffObject.TotalNavTime = totalNavTime;
    diffObject.DomProcessingTime = domProcessionTime;
    diffObject.LoadingTime = loadingTime;
    diffObject.domInteractive=domInteractive;
    diffObject.responseTime=responseTime;

    //Capture CDP metrics
    var cdpObj = extractDataFromPerformanceMetrics(
        perfMetrics,
        'FirstMeaningfulPaint', 'JSHeapUsedSize', 'JSHeapTotalSize','DomContentLoaded'
    );
    diffObject.DomContentLoaded=Math.round(cdpObj["DomContentLoaded"]);
    diffObject.JSHeapUsedSize=cdpObj["JSHeapUsedSize"];
    diffObject.JSHeapTotalSize=cdpObj["JSHeapTotalSize"];
    diffObject.FirstMeaningfulPaint=Math.round(cdpObj["FirstMeaningfulPaint"]);

    var paints =await page.evaluate(_ => {
        var results = {};
        performance.getEntriesByType('paint').map(entry => {
        results[entry.name] = entry.startTime;
        });
        return results;
        });
        
        diffObject.FirstPaint = Math.round(paints["first-paint"]);
        diffObject.FirstContenfulPaint = Math.round(paints["first-contentful-paint"]);
        
        //Get Resource Timing
        var resources =await page.evaluate(_ => {
        var results = {};
        performance.getEntriesByType('resource').map(entry => {
        results[entry.name] = entry.duration;
        });
        return results;
        });
        
        diffObject.Resources = resources;
        
        return diffObject;
        }
        module.exports = getPageMetrics;