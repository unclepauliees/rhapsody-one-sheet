import { BRAND_NAME, LOCKUPS, SPINE, BOILERPLATE, MANIFESTO, CONTACT_EMAIL, INVITATION, PARENT_LINE, timeline } from "@/config/brand";
import "./print.css";
import { asset } from "@/config/assets";

export default function PrintPage() {
  return <main className="print-sheet">
    <header className="print-top">
      <img src={LOCKUPS.light} alt={BRAND_NAME}/>
      <span>5 OCTOBER 2026<br/>NEW YORK</span>
    </header>
    <section className="print-opening">
      <h1>{SPINE}</h1>
      <p>{BOILERPLATE}</p>
    </section>
    <div className="print-orbit">
      <img src={asset("/brand/windows/eclipse.webp")} alt="An eclipse with a luminous corona"/>
      <h2>{MANIFESTO}</h2>
    </div>
    <section className="print-studio">
      <h2>A session.<br/>A real master.</h2>
      <div>
        <p>Compose a time-locked work around a pass, light condition, city or moment. Each take is authenticated at source, downlinked and archived with provenance.</p>
        <p>A standard creative envelope enables integration in weeks rather than years, with media rights returned. Physically and cryptographically segregated networks keep each work separate.</p>
      </div>
    </section>
    <dl className="print-timeline" aria-label="Program timeline">{timeline.map(([date, milestone]) => <div key={date}><dt>{date}</dt><dd>{milestone}</dd></div>)}</dl>
    <section className="print-invitation">
      <h2>An invitation to<br/>the first generation.</h2>
      <div><p>Founding client conversations are open.</p><a href={INVITATION}>{CONTACT_EMAIL}</a></div>
    </section>
    <div className="print-footer"><span>{PARENT_LINE}</span><span>© 2026 Symphony Space</span></div>
  </main>;
}
