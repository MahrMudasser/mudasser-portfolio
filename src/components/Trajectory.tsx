import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Step } from '@/data/site';
import { ICONS } from '@/data/icons';
import TechIcon from './TechIcon';

/**
 * "Always one level up." The bars rise one by one when the graph comes into view, a staircase
 * line draws along their tops, and the card on the right tells the story of the selected step.
 */
export default function Trajectory({ steps }: { steps: Step[] }) {
  const current = Math.max(0, steps.findIndex((s) => s.now));
  const [sel, setSel] = useState(current);
  const [swap, setSwap] = useState(0);
  const [armed, setArmed] = useState(false);
  const [go, setGo] = useState(false);
  const [paths, setPaths] = useState({ a: 'M0 0', b: 'M0 0' });
  const graph = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  const pick = useCallback((i: number) => {
    setSel((s) => { if (s !== i) setSwap((n) => n + 1); return i; });
  }, []);

  // Trace the staircase along the bar tops (desktop layout only).
  const trace = useCallback(() => {
    const g = graph.current;
    if (!g || matchMedia('(max-width: 900px)').matches) return;
    const gr = g.getBoundingClientRect();
    const bars = Array.from(g.querySelectorAll<HTMLElement>('.tj-bar'));
    if (bars.length < 2) return;
    const f = (n: number) => n.toFixed(1);
    const pts = bars.map((b) => { const r = b.getBoundingClientRect(); return { x0: r.left - gr.left + 1, x1: r.right - gr.left - 1, y: r.top - gr.top }; });
    const last = pts.length - 1;
    let a = `M${f(pts[0].x0)} ${f(pts[0].y)}`;
    for (let i = 0; i < last; i++) { a += ` L${f(pts[i].x1)} ${f(pts[i].y)}`; if (i < last - 1) a += ` L${f(pts[i + 1].x0)} ${f(pts[i + 1].y)}`; }
    const p = pts[last - 1], q = pts[last];
    const b = `M${f(p.x1)} ${f(p.y)} L${f(q.x0)} ${f(q.y)} L${f(q.x1)} ${f(q.y)}`;
    setPaths({ a, b });
  }, []);

  useLayoutEffect(() => {
    trace();
    const ro = new ResizeObserver(() => trace());
    if (graph.current) ro.observe(graph.current);
    document.fonts?.ready.then(trace);
    return () => ro.disconnect();
  }, [trace]);

  // Play once the whole graph is on screen; replay after it leaves the viewport completely.
  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    setArmed(true);
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting && en.intersectionRatio >= 0.55) setGo(true);
      else if (!en.isIntersecting) setGo(false);
    }, { threshold: [0, 0.55], rootMargin: '0px 0px -8% 0px' });
    io.observe(graph.current ?? el);
    return () => io.disconnect();
  }, []);

  const s = steps[sel];
  const accent = s.next ? 'var(--warm)' : 'var(--accent)';
  const fill = (st: Step) => `linear-gradient(180deg, color-mix(in srgb, ${st.next ? 'var(--bar-next)' : 'var(--bar)'} ${Math.round(st.alpha * 100)}%, transparent), color-mix(in srgb, ${st.next ? 'var(--bar-next)' : 'var(--bar)'} 2%, transparent))`;

  return (
    <div ref={root} className={`tj${armed ? ' armed' : ''}${go ? ' go' : ''}`}>
      <div className="tj-head">
        <span className="eyebrow">2020 → next</span>
        <span className="muted" style={{ fontSize: 14 }}>Each step a bigger scope: code, then teams, then systems</span>
      </div>
      <div className="tj-wrap">
        <div className="tj-graph-col">
          <div className="tj-graph" ref={graph} role="list" aria-label="Career steps">
            <span className="tj-base" aria-hidden="true" />
            <svg className="tj-svg" aria-hidden="true">
              <path className="tj-line" d={paths.a} pathLength={1} fill="none" stroke="var(--accent)" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 6px color-mix(in srgb, var(--accent) 55%, transparent))' }} />
              <path className="tj-line2" d={paths.b} fill="none" stroke="var(--warm)" strokeWidth={2} strokeDasharray="5 6" strokeLinecap="round" />
            </svg>
            {steps.map((st, i) => (
              <button
                key={i}
                type="button"
                role="listitem"
                className={`tj-col${st.next ? ' next' : ''}${i === sel ? ' sel' : ''}`}
                style={{ ['--i' as string]: i, ['--bh' as string]: `${st.height}px` }}
                aria-pressed={i === sel}
                aria-controls="tj-detail"
                onMouseEnter={() => pick(i)}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
              >
                <span className="tj-lab">
                  <span className="tj-role">{st.short}</span>
                  <span className="tj-co">{st.company}</span>
                </span>
                <span className="tj-bar" style={{ height: st.height, backgroundImage: fill(st) }}>
                  <span className="tj-dot" />
                </span>
              </button>
            ))}
          </div>
          <div className="tj-axis" aria-hidden="true">
            {steps.map((st, i) => <span key={i} className={`${i === sel ? 'on' : ''}${st.next ? ' next' : ''}`}>{st.years}</span>)}
          </div>
        </div>

        <div id="tj-detail" className="tj-detail" aria-live="polite" style={{ ['--tj-accent' as string]: accent }}>
          <div key={swap} className="tj-swap" style={{ display: 'contents' }}>
            <div className="tj-detail-top">
              <span style={{ color: accent }}>Scope · {s.scope}</span>
              <span className="muted">{s.next ? 'Next step' : s.years}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <h3>{s.role}</h3>
              <span className="muted" style={{ fontSize: 14 }}>{s.where}</span>
            </div>
            <ul className="tj-points">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <div className="tj-detail-foot">
              <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                {s.stack.map((k) => <span key={k} title={ICONS[k].name}><TechIcon name={k} size={20} /></span>)}
              </span>
              {s.next
                ? <a className="btn btn-warm btn-sm" href="#contact">Talk to me <span className="arr" aria-hidden="true">→</span></a>
                : <span className="mono muted" style={{ fontSize: 11.5, letterSpacing: '.06em' }}>Hover a step</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
