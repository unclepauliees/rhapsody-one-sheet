import {session} from './browser.mjs';
import {writeFile} from 'node:fs/promises';
const s=await session();const report=[];const errors=[];
try{
for(const width of [390,768,1440])for(const theme of ['light','dark']){
 const page=await s.browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
 page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(t=>localStorage.setItem('rhapsody-theme',t),theme);
 await page.goto(s.url);await page.evaluate(()=>document.fonts.ready);
 await page.locator('.scene-shell').scrollIntoViewIfNeeded();await page.locator('canvas').waitFor();await page.waitForTimeout(1200);
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw new Error(`Overflow ${width}`);
 await page.screenshot({path:`screenshots/${theme}-${width}.png`,fullPage:true});
 const pixels=await page.locator('canvas').evaluate(c=>{const gl=c.getContext('webgl2');const data=new Uint8Array(4*c.width*c.height);gl.readPixels(0,0,c.width,c.height,gl.RGBA,gl.UNSIGNED_BYTE,data);let n=0;for(let i=3;i<data.length;i+=4)if(data[i])n++;return n;});
 if(pixels<100)throw new Error('Blank canvas');
 if(width===1440)for(const name of ['First light','The eclipse crossing','The pass over the city','The master']){
 await page.getByRole('button',{name:new RegExp(name)}).click();await page.waitForTimeout(500);
 await page.locator('.scene-shell').screenshot({path:`screenshots/${theme}-${name.replaceAll(' ','-')}.png`});
 }
 report.push({width,theme,opaqueCanvasPixels:pixels});await page.close();
}
if(errors.length)throw new Error(errors.join('\n'));
await writeFile('screenshots/qa.json',JSON.stringify(report,null,2));console.log(report);
}finally{await s.close();}
