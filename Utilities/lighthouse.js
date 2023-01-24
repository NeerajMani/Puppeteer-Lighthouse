const lighthouse = require('lighthouse');

const getLighthouseMetrics = async (url, browser) => {
      // Close all tabs except the first one
  const tabs = await browser.pages();
  for (let i = 1; i < tabs.length; i++) {
    await tabs[i].close();
  }
    const {lhr} = await lighthouse(url, {
    port: (new URL(browser.wsEndpoint())).port,
    output: 'json'
  });
  
  const lighthouseMetrics = {
    accessibility: lhr.categories.accessibility.score * 100,
    performance: lhr.categories.performance.score * 100,
    bestPractices: lhr.categories['best-practices'].score * 100,
    seo: lhr.categories.seo.score * 100,
    pwa: lhr.categories.pwa.score * 100
  };

  return lighthouseMetrics;
}

module.exports = {getLighthouseMetrics};
