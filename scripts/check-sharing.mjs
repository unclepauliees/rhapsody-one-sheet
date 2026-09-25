import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const url = process.argv[2] || 'https://1sheet.project-rhapsody.com/';
const agents = {
  iOS: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1',
  Android: 'Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/130.0.0.0 Mobile Safari/537.36',
  WhatsApp: 'WhatsApp/2.24.20.74 A',
  Meta: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
  X: 'Twitterbot/1.0',
  LinkedIn: 'LinkedInBot/1.0',
};
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const [name, userAgent] of Object.entries(agents)) {
    const context = await browser.newContext({ userAgent, javaScriptEnabled: false });
    const page = await context.newPage();
    const response = await page.goto(url);
    assert.equal(response.status(), 200);
    const meta = key => page.locator(`head meta[property="${key}"], head meta[name="${key}"]`).getAttribute('content');
    const image = await meta('og:image');
    assert.match(image, /^https:\/\/.+\.png$/);
    assert.equal(await meta('twitter:image'), image);
    assert.equal(await meta('og:image:secure_url'), image);
    assert.equal(await meta('twitter:card'), 'summary_large_image');
    assert.equal(await meta('og:type'), 'website');
    assert.match(await meta('og:title'), /^Project Rhapsody/);
    assert.equal(await meta('og:url'), new URL(url).origin + '/');
    assert.equal(await page.locator('head link[rel="canonical"]').getAttribute('href'), new URL(url).origin + '/');
    const asset = await context.request.get(image);
    assert.equal(asset.status(), 200);
    assert.match(asset.headers()['content-type'], /^image\/png/);
    const png = await asset.body();
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
    console.log(`${name}: server-rendered metadata and HTTPS PNG verified (${png.length} bytes)`);
    await context.close();
  }
} finally { await browser.close(); }
