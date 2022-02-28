const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { BASE_URL, URL_LIST, WAIT_PAGE_LOAD = 3000, TIMEOUT = 30000 } = require('./config');

(async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    timeout: TIMEOUT,
  });

  const page = await browser.newPage();

  async function generateContent(pagePath) {
    log('start -> ', pagePath);
    await page.goto(BASE_URL + pagePath,{ waitUntil: 'networkidle0' });
    log(`wait ${WAIT_PAGE_LOAD}ms`);
    await page.waitForTimeout(WAIT_PAGE_LOAD);

    fs.mkdirSync(path.resolve(__dirname, `./screenshot/${pagePath}`), { recursive: true });
    fs.mkdirSync(path.resolve(__dirname, `./cache/${pagePath}`), { recursive: true });

    const pageContent = await page.content();
    const filePath = path.resolve(__dirname, `./cache/${pagePath}/index.html`);
    fs.writeFileSync(filePath, pageContent, {  flag: 'w+' });
    log(`write html`);

    await page.hover('body');

    log(`screenshot`);
    await page.screenshot({ 
      path: `./screenshot/${pagePath}/${new Date().toLocaleString().replaceAll('/', '-')}.png`,
      fullPage: true,
    });
    log('end -> ', pagePath);
  }

  for (let i = 0; i < URL_LIST.length; i++) {
    await generateContent(URL_LIST[i]);
  }

  await browser.close();
})();

function log(...msg) {
  console.log(new Date().toJSON(), ...msg);
}