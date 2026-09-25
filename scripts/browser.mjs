import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
export async function session() {
  const port = 3198;
  const server = spawn(process.execPath, ['node_modules/next/dist/bin/next','start','-p',String(port),'-H','127.0.0.1'], {stdio:'ignore'});
  const url = `http://127.0.0.1:${port}`;
  let ready=false;
  for(let i=0;i<60;i++){try {const r=await fetch(url);if(r.ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,500));}
  if(!ready){server.kill();throw new Error('Preview server did not start');}
  const browser = await chromium.launch({channel:'chrome',headless:true,args:['--enable-webgl','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  return {url,browser,close:async()=>{await browser.close();server.kill();}};
}
