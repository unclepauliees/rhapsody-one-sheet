import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { session } from './browser.mjs';
import {writeFile} from 'node:fs/promises';
const s=await session();
const chrome=await chromeLauncher.launch({chromeFlags:['--headless','--enable-unsafe-swiftshader','--use-angle=swiftshader']});
try{for(const formFactor of ['desktop','mobile']){
 const result=await lighthouse(s.url,{port:chrome.port,output:'json',onlyCategories:['performance','accessibility'],formFactor,...(formFactor==='desktop'?{throttling:{rttMs:40,throughputKbps:10240,cpuSlowdownMultiplier:1,requestLatencyMs:0,downloadThroughputKbps:0,uploadThroughputKbps:0}}:{}),screenEmulation:{mobile:formFactor==='mobile',width:formFactor==='mobile'?390:1440,height:900,deviceScaleFactor:1,disabled:false}});
 await writeFile(`screenshots/lighthouse-${formFactor}.json`,result.report);
 console.log(formFactor,Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])));
}}
finally{await chrome.kill();await s.close();}
