"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { asset } from "@/config/assets";
import { ArrowUpRight, Download, Play, Pause, MousePointer2 } from "lucide-react";
import { BRAND_NAME, SPINE, BOILERPLATE, PDF_PATH, LOCKUPS, INVITATION, PARENT_LINE, moments, timeline, CREATIVE_FRAMEWORK, type Moment } from "@/config/brand";

const Instrument = dynamic(() => import("@/components/ui/lunar-gravity-card"), {
  ssr: false,
  loading: () => <img className="fallback-still" src={asset("/brand/instrument-still-dark.png")} alt="Lunar instrument" />,
});
const views = ["Introduction", "The windows", "The studio"] as const;

export default function OneSheet() {
  const [view, setView] = useState<typeof views[number]>("Introduction");
  const [moment, setMoment] = useState<Moment>("firstlight");
  const [lastWindow, setLastWindow] = useState<Exclude<Moment, "master">>("firstlight");
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = "dark";
    return () => { delete document.documentElement.dataset.theme; };
  }, []);
  const selected = moments.find(m => m.id === moment)!;
  const chooseMoment = (next: Moment) => {
    if (next !== "master") setLastWindow(next);
    setMoment(next);
  };

  return <div className="space-page">
    <div className="space-backdrop" aria-hidden="true">
      {(["firstlight", "eclipse", "city"] as const).map(window => <img key={window} src={asset(`/brand/windows/${window}.webp`)} alt="" className={lastWindow === window ? "active" : ""} fetchPriority={window === "firstlight" ? "high" : "auto"}/>)}
    </div>
    <div className="space-visual">
      <Instrument moment={lastWindow} theme="dark" paused={paused || moment === "master"} immersive />
    </div>
    {!paused && moment !== "master" && <p className="space-play-hint"><MousePointer2 size={14} aria-hidden="true"/>Click and drag to play</p>}
    <header className="space-header">
      <Link href="/" className="space-brand" aria-label={BRAND_NAME}><img src={LOCKUPS.dark} alt={BRAND_NAME} /></Link>
      <a className="space-download" href={PDF_PATH} download aria-label="Download one-sheet PDF"><Download size={16}/><span>One-sheet</span><span className="pdf-label">PDF</span></a>
    </header>
    <main className="space-main">
      <div className="space-copy">
        <h1>{SPINE}</h1>
        <div className="space-tabs" role="tablist" aria-label="About Project Rhapsody">
          {views.map((name, index) => <button key={name} id={`view-${index}`} role="tab" aria-selected={view === name} aria-controls="space-panel" tabIndex={view === name ? 0 : -1} onClick={() => setView(name)} onKeyDown={event => {
            const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
            if(direction){event.preventDefault(); const next=(index+direction+views.length)%views.length;setView(views[next]);document.getElementById(`view-${next}`)?.focus();}
          }}>{name}</button>)}
        </div>
        <div id="space-panel" className="space-panel" role="tabpanel" aria-labelledby={`view-${views.indexOf(view)}`} tabIndex={0}>
          {view === "Introduction" && <><p className="space-intro">{BOILERPLATE}</p><p className="space-manifesto">Nobody has played this before.</p></>}
          {view === "The windows" && <><label className="window-picker">Choose a window<select value={moment} onChange={e => chooseMoment(e.target.value as Moment)}>{moments.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}</select></label><p>{selected.body}</p><p className="space-note">{selected.note}</p></>}
          {view === "The studio" && <><h2>A session. A real master.</h2><p>Compose a time-locked work around a specific pass, light condition, city or moment.</p><p className="space-note">{CREATIVE_FRAMEWORK}</p><dl className="space-timeline" aria-label="Program timeline">{timeline.map(([date, milestone]) => <div key={date}><dt>{date}</dt><dd>{milestone}</dd></div>)}</dl><details><summary>Your session is yours alone.</summary><p>Every work runs on physically and cryptographically segregated networks. No one else sees it, touches it, or shares the window.</p></details></>}
        </div>
        <a className="space-cta" href={INVITATION}>Join the founding conversations<ArrowUpRight size={18}/></a>
      </div>
    </main>
    <footer className="space-footer">
      <div className="space-date"><i/>5 OCTOBER 2026 · NEW YORK</div>
      <span>{PARENT_LINE}</span>
      <button className="space-pause" onClick={() => setPaused(!paused)} title={paused ? "Resume instrument" : "Pause instrument"} aria-label={paused ? "Resume instrument" : "Pause instrument"}>{paused ? <Play size={16}/> : <Pause size={16}/>}</button>
    </footer>
  </div>;
}
