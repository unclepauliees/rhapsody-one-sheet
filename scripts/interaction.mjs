import {session} from './browser.mjs';
import {createHash} from 'node:crypto';
const s=await session();
try{
 const page=await s.browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(s.url);await page.locator('.scene-shell').scrollIntoViewIfNeeded();await page.locator('canvas').waitFor();await page.waitForTimeout(800);
 const shot=()=>page.locator('canvas').screenshot();const hash=b=>createHash('sha256').update(b).digest('hex');
 const first=hash(await shot());await page.waitForTimeout(500);if(first===hash(await shot()))throw Error('Instrument is not moving');
 await page.getByRole('button',{name:'Toggle orbital motion'}).click();await page.waitForTimeout(3500);
 await page.locator('.scene-shell').screenshot({path:'screenshots/orbital-motion.png'});
 await page.getByRole('button',{name:'Pause instrument'}).click();await page.waitForTimeout(500);
 const stopped=hash(await shot());await page.waitForTimeout(500);if(stopped!==hash(await shot()))throw Error('Pause did not freeze scene');
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(500);
 const reduced=hash(await shot());await page.waitForTimeout(500);if(reduced!==hash(await shot()))throw Error('Reduced motion is not static');
 await page.goto(s.url);await page.keyboard.press('Tab');await page.keyboard.press('Tab');
 if(!await page.getByRole('button',{name:'Switch to dark theme'}).evaluate(el=>el===document.activeElement))throw Error('Keyboard focus order');
 if(errors.length)throw Error(errors.join('\n'));
 console.log('Motion, orbital reveal, pause, reduced motion and keyboard checks passed');
}finally{await s.close();}
