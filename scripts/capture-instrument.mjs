import { session } from './browser.mjs';
const s=await session();
try {
 for(const theme of ['light','dark']) {
  const page=await s.browser.newPage({viewport:{width:1440,height:1100},deviceScaleFactor:2,reducedMotion:'reduce'});
  await page.addInitScript(t=>localStorage.setItem('rhapsody-theme',t),theme);
  await page.goto(s.url+'/instrument-capture');await page.evaluate(()=>document.fonts.ready);
  await page.locator('.scene-shell').scrollIntoViewIfNeeded();
  await page.locator('.instrument-canvas canvas').waitFor();
  await page.locator('.instrument-canvas').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1800);
  await page.addStyleTag({content:'.scene-pause,.scene-caption,.orbit-toggle{visibility:hidden}'});
  await page.locator('.instrument-canvas').screenshot({path:`public/brand/instrument-still-${theme}.png`});
  await page.close();
 }
}finally{await s.close();}
