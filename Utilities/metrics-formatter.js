const _ = require('lodash');

const formatMetrics = (metrics) => {
    return _.mapKeys(metrics, (value, key) => _.startCase(key));
}

module.exports = { formatMetrics };
