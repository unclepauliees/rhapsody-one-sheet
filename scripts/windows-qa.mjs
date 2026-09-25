import {session} from './browser.mjs';
import {createHash} from 'node:crypto';
const s=await session();
try {
 for(const [width,height] of [[1440,900],[390,844]]){
  const page=await s.browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(s.url);await page.evaluate(()=>document.fonts.ready);await page.locator('canvas').waitFor();
  await page.evaluate(()=>Promise.all([...document.querySelectorAll('.space-backdrop img')].map(img=>img.decode())));
  await page.getByRole('tab',{name:'The windows'}).click();
  for(const moment of ['firstlight','eclipse','city','master']){
   await page.getByRole('combobox').selectOption(moment);await page.waitForTimeout(600);
   await page.screenshot({path:`screenshots/window-${moment}-${width}.png`,fullPage:true});
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Horizontal overflow');
  }
  const held=await page.locator('.space-backdrop img.active').getAttribute('src');
  if(!held.includes('city'))throw Error('Master did not retain preceding window');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(500);
  const hash=async()=>createHash('sha256').update(await page.locator('canvas').screenshot()).digest('hex');
  const before=await hash();await page.waitForTimeout(400);if(before!==await hash())throw Error('Master is not frozen');
  if(errors.length)throw Error(errors.join('\n'));
  console.log(`${width}px: images loaded, four windows selected, master holds city and freezes canvas`);await page.close();
 }
} finally {await s.close();}
