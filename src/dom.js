const phantom = require("phantom");

class Dom {
  async loadPage(url) {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.open(url);
    const content = await page.property('content');
    instance.exit();
    return content;
  }
};

module.exports = Dom;