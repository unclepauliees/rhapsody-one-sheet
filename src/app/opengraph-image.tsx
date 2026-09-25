import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { BRAND_NAME, MANIFESTO } from '@/config/brand';
export const alt = `${BRAND_NAME} partner one-sheet`;
export const size = {width:1200,height:630};
export const contentType = 'image/png';
export const dynamic = 'force-static';
export default async function Image(){
 const logo=await readFile(path.join(process.cwd(),'public/brand/lockup-light.png'));
 const font=await readFile(path.join(process.cwd(),'public/fonts/SpaceMono-Regular.ttf'));
 return new ImageResponse(<div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',height:'100%',background:'#ECE7DA',padding:60,color:'#1C1712'}}><img width={310} height={150} src={`data:image/png;base64,${logo.toString('base64')}`} alt={BRAND_NAME}/><div style={{fontFamily:'Space',fontSize:66,lineHeight:1.1,maxWidth:1050}}>{MANIFESTO}</div><div style={{fontSize:20}}>ORBITAL MEDIA STUDIO</div></div>,{...size,fonts:[{name:'Space',data:font,weight:400}]});
}
