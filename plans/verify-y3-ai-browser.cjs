const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright');

const root = path.resolve(__dirname, '..');
const output = path.join(root, '.cache-loader/y3-ai-docs');
const baseline = JSON.parse(fs.readFileSync(path.join(output, 'baseline.json'), 'utf8'));
const shareRoutes = JSON.parse(fs.readFileSync(path.join(output, 'share-routes.json'), 'utf8'));
const pages = shareRoutes.map(route => ({site: 'share', source: route.source.slice(6), route: route.permalink}));

(async () => {
  const browser = await chromium.launch({headless: true, executablePath: process.env.CHROME_PATH});
  const results = [];
  const navigation = [];
  try {
    for (const viewport of (process.argv.includes('--navigation-only') ? [] : [{width: 1440, height: 1000}, {width: 390, height: 844}])) {
      const context = await browser.newContext({viewport, deviceScaleFactor: 1});
      const page = await context.newPage();
      for (const [index, entry] of pages.entries()) {
        const errors = [];
        const onError = error => errors.push(error.message);
        page.on('pageerror', onError);
        const origin = process.env.Y3_PREVIEW_ORIGIN || 'http://127.0.0.1:3100';
        const response = await page.goto(origin + entry.route, {waitUntil: 'load', timeout: 120000});
        await page.locator('h1').first().waitFor({timeout: 30000});
        await page.evaluate(() => document.fonts.ready);
        const main = page.locator('main').first();
        const scope = await main.count() ? main : page.locator('article').first();
        const images = scope.locator('img');
        for (let i = 0; i < await images.count(); i++) {
          await images.nth(i).scrollIntoViewIfNeeded();
          await images.nth(i).evaluate(image => new Promise(resolve => {
            if (image.complete) return resolve();
            image.addEventListener('load', resolve, {once: true});
            image.addEventListener('error', resolve, {once: true});
            setTimeout(resolve, 15000);
          }));
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        const old = baseline.find(doc => doc.targetFile === entry.source);
        const state = await page.evaluate(oldIds => ({
          title: document.querySelector('h1')?.textContent,
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          missingAnchors: oldIds.filter(id => !document.getElementById(id)),
          brokenImages: [...document.querySelectorAll('main img, article img')].filter(img => !img.complete || !img.naturalWidth).map(img => img.src),
          links: [...document.querySelectorAll('main a[href], article a[href]')].map(a => a.href),
        }), old?.anchors || []);
        const screenshot = `${entry.site}-${index}-${viewport.width}.png`;
        await page.screenshot({path: path.join(output, screenshot), fullPage: true});
        const result = {site: entry.site, route: entry.route, viewport: viewport.width, status: response.status(), ...state, errors, screenshot};
        results.push(result);
        console.log(JSON.stringify({...result, links: undefined}));
        page.off('pageerror', onError);
      }
      await context.close();
    }
    const origin = process.env.Y3_PREVIEW_ORIGIN || 'http://127.0.0.1:3100';
    for (const width of [1440, 390]) {
      const context = await browser.newContext({viewport: {width, height: 1000}});
      const page = await context.newPage();
      await page.goto(origin + '/docs/Y3AI开发教程/');
      if (width === 390) {
        await page.getByRole('button', {name: '切换导航栏', exact: true}).click();
        await page.locator('.navbar-sidebar').getByRole('link', {name: '配置 Y3Maker', exact: true}).click();
        await page.getByRole('heading', {name: '配置 Y3Maker', exact: true}).waitFor();
        navigation.push({viewport: width, check: 'mobile sidebar', passed: true});
        await page.goto(origin + '/docs/Y3AI开发教程/');
      }
      for (const [label, title] of [['准备 Y3 项目', '准备 Y3 项目'], ['配置 Y3Maker', '配置 Y3Maker'], ['日常开发任务', '日常开发任务']]) {
        await page.locator('main').getByRole('link', {name: label, exact: true}).first().click();
        await page.getByRole('heading', {name: title, exact: true}).waitFor();
        if (!page.url().startsWith(origin + '/docs/Y3AI')) throw Error('Core reading path left Y3 Share');
        navigation.push({viewport: width, check: label, passed: true});
        if (title === '配置 Y3Maker') {
          const nextHref = await page.locator('.pagination-nav__link--next').getAttribute('href');
          if (!nextHref?.endsWith('/DailyTasks')) throw Error('Beginner pagination must continue to daily tasks');
          navigation.push({viewport: width, check: 'Y3Maker next page is daily tasks', passed: true});
        }
      }
      await page.goto(origin + '/docs/Y3AI开发教程/EnvironmentSetup');
      await page.locator('main a[href$="#model-connection"]').click();
      await page.locator('#model-connection').waitFor();
      navigation.push({viewport: width, check: 'connect built-in Y3Maker before dependencies', passed: true});
      await page.locator('main').getByRole('link', {name: '准备 Y3 项目中的安装提示词', exact: true}).click();
      await page.locator('#support-tools').waitFor();
      navigation.push({viewport: width, check: 'return to built-in installation prompts', passed: true});
      if (width === 390) {
        await page.goto(origin + '/docs/Y3AI开发教程/Tools');
        const scrolled = await page.locator('.y3-ai-table').first().evaluate(table => {
          table.scrollLeft = 120;
          return table.scrollLeft > 0 && document.documentElement.scrollWidth === innerWidth;
        });
        if (!scrolled) throw Error('Mobile reference table does not scroll inside the page');
        navigation.push({viewport: width, check: 'reference table scroll', passed: true});
      }
      const category = await context.request.get(origin + '/docs/category/03-agent部署教程');
      if (category.status() !== 200) throw Error('Legacy Agent category URL is broken');
      navigation.push({viewport: width, check: 'legacy category URL', passed: true});
      await context.close();
    }
  } finally {
    await browser.close();
    if (results.length) fs.writeFileSync(path.join(output, 'browser.json'), JSON.stringify(results, null, 2));
    fs.writeFileSync(path.join(output, 'navigation.json'), JSON.stringify(navigation, null, 2));
  }
  const failed = results.filter(result => result.status !== 200 || result.scrollWidth > result.width || result.missingAnchors.length || result.brokenImages.length || result.errors.length);
  console.log(JSON.stringify({pages: results.length, navigationChecks: navigation.length, failures: failed.length}));
  process.exitCode = failed.length ? 1 : 0;
})().catch(error => { console.error(error); process.exitCode = 1; });
