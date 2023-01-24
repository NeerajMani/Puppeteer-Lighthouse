//const resultCsv = require('objects-to-csv');
const subtractDuration = require('./subtractDuration');
const getPageMetrics = require('./metricsData');
const {
    getTimeFromPerformanceMetrics,
    extractDataFromPerformanceMetrics,
    } = require('./helper');
    
    async function captureMetrics (pageName, perfObjectNew, perfObjectOld, sw, page, client) {
    try {    
        const diffObject = await subtractDuration(perfObjectNew, perfObjectOld);
        diffObject.PageName = pageName;
        diffObject.PageLoadTime = sw.elapsedMilliseconds;

        let perfMetrics = await client.send('Performance.getMetrics');
      
        let intCtr = 0;
        let FirstMeaningfulPaint = 0;
        while(FirstMeaningfulPaint === 0) {
            //await page.waitFor(3000);
            if(intCtr === 4) {
                break;
            }
            intCtr = intCtr + 1;
            perfMetrics = await client.send('Performance.getMetrics');
            FirstMeaningfulPaint = getTimeFromPerformanceMetrics(perfMetrics, 'FirstMeaningfulPaint');
        }

        const allPageMetrics = await getPageMetrics(page, diffObject, perfMetrics);
        console.log(diffObject.PageName +" metrics:\n"+ JSON.stringify(allPageMetrics));

        //Save to csv
       // new resultCsv([allPageMetrics]).toDisk('./test.csv', { append: true });
        
        //Capture screenshots
       // var name=Date(Date.now()).toLocaleString().substring(4,15);
        //await page.screenshot({path:name+"_"+Date.now()+"_"+allPageMetrics.PageName+".png",fullPage:true});
    
        return page;
        }
        catch(e){
            var name=Date(Date.now()).toLocaleString().substring(4,15);
            await page.screenshot({path:name+"_"+Date.now()+"_Error.png",fullPage:true});
        
    console.log(JSON.stringify(e.message));
    console.log(JSON.stringify(e.stack));
    return page;
        }}
        module.exports= captureMetrics;
    
