import {session} from './browser.mjs';
const s=await session();
try{
 for(const [width,height] of [[1440,900],[1024,768],[390,844],[360,800]]){
  const page=await s.browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(s.url);await page.evaluate(()=>document.fonts.ready);await page.locator('canvas').waitFor();await page.waitForTimeout(1500);
  const metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:innerHeight,scrollHeight:document.documentElement.scrollHeight}));
  if(metrics.scrollWidth>width)throw Error('Horizontal overflow');
  if(width>=900&&metrics.scrollHeight>height)throw Error('Desktop is not a single viewport');
  await page.screenshot({path:`screenshots/space-${width}.png`,fullPage:true});
  const opaque=await page.locator('canvas').evaluate(c=>{const gl=c.getContext('webgl2');const data=new Uint8Array(c.width*c.height*4);gl.readPixels(0,0,c.width,c.height,gl.RGBA,gl.UNSIGNED_BYTE,data);return data.reduce((sum,v,i)=>sum+(i%4===3&&v>0?1:0),0)});
  if(opaque<1000)throw Error('Blank 3D scene');
  await page.getByRole('tab',{name:'The windows'}).click();await page.getByRole('combobox').selectOption('eclipse');await page.waitForTimeout(350);
  await page.screenshot({path:`screenshots/space-windows-${width}.png`,fullPage:true});
  await page.getByRole('tab',{name:'The studio'}).click();await page.getByText('Your session is yours alone.',{exact:true}).click();
  await page.screenshot({path:`screenshots/space-studio-${width}.png`,fullPage:true});
  if(errors.length)throw Error(errors.join('\n'));
  console.log({...metrics,opaqueCanvasPixels:opaque});await page.close();
 }
}finally{await s.close();}
