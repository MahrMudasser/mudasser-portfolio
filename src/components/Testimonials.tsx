import { useRef, useState } from 'react';
import type { Testimonial } from '@/data/site';

const PER = 3;
const Arrow = ({ d }: { d: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d={d} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/** Up to six quotes, three at a time (one featured, two beside it), paged with arrows or a swipe. */
export default function Testimonials({ items, heading }: { items: Testimonial[]; heading?: React.ReactNode }) {
  const list = items.slice(0, 6);
  const pages = Math.max(1, Math.ceil(list.length / PER));
  const [page, setPage] = useState(0);
  const [anim, setAnim] = useState<'' | 'out' | 'in'>('');
  const [dir, setDir] = useState(1);
  const busy = useRef(false);
  const touchX = useRef<number | null>(null);

  const go = (d: number) => {
    const to = page + d;
    if (to < 0 || to >= pages || busy.current) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setPage(to); return; }
    busy.current = true; setDir(d); setAnim('out');
    setTimeout(() => { setPage(to); setAnim('in'); setTimeout(() => { busy.current = false; }, 650); }, 400);
  };

  const pg = list.slice(page * PER, page * PER + PER);
  const card = (t: Testimonial, i: number) => {
    const big = i === 0;
    const role = big ? 'tile-tint' : i === 1 ? '' : '';
    return (
      <figure key={`${page}-${i}`} className={`tile ${role} ${big ? 'c-7 r-2 tile-lg' : 'c-5'}`} style={{ ['--sd' as string]: `${i * 70}ms` }}>
        <div className="tq-head">
          <span className="eyebrow">{t.who}</span>
          {t.placeholder && <span className="tag tag-dashed">Placeholder</span>}
        </div>
        <span className="tq-mark" aria-hidden="true" style={{ fontSize: big ? 120 : 56 }}>“</span>
        <blockquote className="t-muted" style={big
          ? { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(24px, 2.5vw, 36px)', lineHeight: 1.16, letterSpacing: '-0.03em', textWrap: 'pretty' }
          : { fontSize: 17, lineHeight: 1.5, textWrap: 'pretty' }}>{t.quote}</blockquote>
        <figcaption className="tq-who">
          <span className="tq-avatar" aria-hidden="true" style={{ width: big ? 48 : 40, height: big ? 48 : 40 }}>{t.initials ?? ''}</span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: 2, lineHeight: 1.3 }}>
            <span className="tq-name">{t.name}</span>
            <span className="tq-role">{t.role}</span>
          </span>
        </figcaption>
      </figure>
    );
  };

  const [slide, setSlide] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const onScroll = () => {
    const t = track.current; if (!t) return;
    const w = (t.firstElementChild as HTMLElement | null)?.offsetWidth || 1;
    setSlide(Math.round(t.scrollLeft / (w + 12)));
  };
  const goTo = (i: number) => {
    const t = track.current; if (!t) return;
    const el = t.children[i] as HTMLElement | undefined;
    if (el) t.scrollTo({ left: el.offsetLeft - t.offsetLeft, behavior: 'smooth' });
  };

  return (
    <>
      <div className="sechead" id="testimonials">
        {heading}
        {pages > 1 && (
          <div className="tq-arrows" style={{ display: 'flex', gap: 12 }}>
            <button type="button" className="icon-btn prev" aria-label="Previous testimonials" aria-controls="tq-grid" disabled={page === 0} onClick={() => go(-1)}><Arrow d="M15 5l-7 7 7 7" /></button>
            <button type="button" className="icon-btn next" aria-label="Next testimonials" aria-controls="tq-grid" disabled={page >= pages - 1} onClick={() => go(1)}><Arrow d="M9 5l7 7-7 7" /></button>
          </div>
        )}
      </div>
      <section
        id="tq-grid"
        aria-label="Testimonials"
        aria-roledescription="carousel"
        className={`bento tq-grid tq-desktop ${anim}`}
        style={{ ['--dir' as string]: dir }}
        onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null; }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current; touchX.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        {pg.map(card)}
      </section>
      <div className="tq-swipe">
        <div className="tq-track" ref={track} onScroll={onScroll} aria-label="Testimonials, swipe for more">
          {list.map((t, i) => (
            <figure key={i} className={`tile tq-slide${i === 0 ? ' tile-tint' : ''}`}>
              <div className="tq-head">
                <span className="eyebrow">{t.who}</span>
                {t.placeholder && <span className="tag tag-dashed">Placeholder</span>}
              </div>
              <span className="tq-mark" aria-hidden="true" style={{ fontSize: 56 }}>“</span>
              <blockquote className="t-muted" style={{ fontSize: 17, lineHeight: 1.5, textWrap: 'pretty' }}>{t.quote}</blockquote>
              <figcaption className="tq-who">
                <span className="tq-avatar" aria-hidden="true" style={{ width: 40, height: 40 }}>{t.initials ?? ''}</span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2, lineHeight: 1.3 }}>
                  <span className="tq-name">{t.name}</span>
                  <span className="tq-role">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="tq-dots" role="tablist" aria-label="Choose a testimonial">
          {list.map((_, i) => (
            <button key={i} type="button" role="tab" aria-selected={i === slide} aria-label={`Testimonial ${i + 1} of ${list.length}`} className={i === slide ? 'on' : ''} onClick={() => goTo(i)} />
          ))}
        </div>
      </div>
    </>
  );
}
