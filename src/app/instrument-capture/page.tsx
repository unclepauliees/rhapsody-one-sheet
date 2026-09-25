"use client";
import {useEffect,useState} from 'react';
import dynamic from 'next/dynamic';
const Instrument=dynamic(()=>import('@/components/ui/lunar-gravity-card'),{ssr:false});
export default function Capture(){
  const [theme,setTheme]=useState<'light'|'dark'>('light');
  useEffect(()=>{const id=requestAnimationFrame(()=>{const dark=localStorage.getItem('rhapsody-theme')==='dark';setTheme(dark?'dark':'light');document.documentElement.dataset.theme=dark?'dark':'light';});return()=>cancelAnimationFrame(id);},[]);
  return <div className="scene-shell" style={{width:656,height:490,background:theme==='light'?'#f4f0e6':'#2a211a'}}><Instrument theme={theme} paused moment="firstlight"/></div>;
}
