import { session } from './browser.mjs';
import { PDFDocument } from 'pdf-lib';
const s=await session();
try {
 const page=await s.browser.newPage({viewport:{width:816,height:1056}});
 await page.goto(s.url+'/print');await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode())));
 const text=await page.locator('.print-sheet').innerText();
 for(const required of ['The first instrument for orbit.', 'merry@symphony-space.com', 'a Symphony Space program.', '5 OCTOBER 2026', 'OCT 2026', 'Conversation Opens in New York', 'One creative framework brings each work to life in weeks, not years.', 'Media rights return to their owners, and each work stays protected on its own physically and cryptographically separate network.', 'APR 2028', 'First two works fly', 'Q2 2029', 'Commercial platform follows']) {
  if(!text.includes(required))throw new Error(`Required copy missing: ${required}`);
 }
 if(text.includes('\u2014'))throw new Error('Em dash found in PDF copy');
 const bottom=await page.locator('.print-footer').evaluate(el=>el.getBoundingClientRect().bottom);
 if(bottom>1008)throw new Error(`Print content violates half-inch margin: ${bottom}`);
 await page.screenshot({path:'screenshots/print.png'});
 const bytes=await page.pdf({path:'public/Project-Rhapsody-One-Sheet.pdf',preferCSSPageSize:true,printBackground:true});
 const pdf=await PDFDocument.load(bytes);const {width,height}=pdf.getPage(0).getSize();
 if(pdf.getPageCount()!==1||width!==612||height!==792)throw new Error('PDF must be one Letter page');
 console.log(`PDF verified: ${pdf.getPageCount()} page, ${width} x ${height} pt; content bottom ${bottom}px`);
}finally{await s.close();}
