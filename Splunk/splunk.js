const SplunkLogger = require('splunk-logging').Logger;

const config = {
    token: "YOUR_TOKEN",
    url: "https://host:8088"
};

const Logger = new SplunkLogger(config);

const sendMetricsToSplunk = (metrics) => {
    Logger.send(metrics, (err, resp, body) => {
        console.log("Response from Splunk", body);
    });
}

module.exports = {sendMetricsToSplunk};
