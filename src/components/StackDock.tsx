import { useEffect, useRef } from 'react';
import { ICONS, type IconKey } from '@/data/icons';
import TechIcon from './TechIcon';

/**
 * The Daily stack strip. It drifts left on its own, can be dragged or flicked either way,
 * and magnifies the logo under the pointer like the macOS Dock, with a name tooltip above it.
 */
export default function StackDock({ items }: { items: IconKey[] }) {
  const box = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const tip = useRef<HTMLSpanElement>(null);
  const loop = [...items, ...items, ...items]; // three copies, so one copy is always wider than the tile

  useEffect(() => {
    const bx = box.current, tr = track.current, tp = tip.current;
    if (!bx || !tr) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const AUTO = reduce ? 0 : -42; // px per second
    let x = 0, v = AUTO, prev = performance.now(), drag = false, lastX = 0, lastT = 0, vel = 0;
    let hover = false, mag = 0, magOn = false, px = 0, raf = 0;
    const kids = () => Array.from(tr.children) as HTMLElement[];
    const period = () => { const k = kids(); const n = k.length / 3; return k[n] ? k[n].offsetLeft - k[0].offsetLeft : tr.scrollWidth / 3; };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000); prev = now;
      if (!drag) {
        const target = hover ? AUTO * 0.5 : AUTO;
        v += (target - v) * Math.min(1, dt * 2.2); // a flick eases back to the drift speed
        x += v * dt;
      }
      const P = period();
      if (P > 0) { x %= P; if (x > 0) x -= P; }
      tr.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;

      mag += ((hover || drag ? 1 : 0) - mag) * Math.min(1, dt * 8);
      if (mag > 0.002 && !reduce) {
        magOn = true;
        const its = kids(), base = tr.getBoundingClientRect().left;
        const cx = its.map((it) => base + it.offsetLeft + it.offsetWidth / 2);
        const sc = cx.map((c) => { const d = px - c; return 1 + 0.62 * mag * Math.exp(-(d * d) / (2 * 72 * 72)); });
        const ex = its.map((it, i) => (sc[i] - 1) * it.offsetWidth);
        let k = 0; cx.forEach((c, i) => { if (Math.abs(px - c) < Math.abs(px - cx[k])) k = i; });
        const sh = new Array(its.length).fill(0);
        for (let i = k + 1; i < its.length; i++) sh[i] = sh[i - 1] + (ex[i - 1] + ex[i]) / 2;
        for (let i = k - 1; i >= 0; i--) sh[i] = sh[i + 1] - (ex[i + 1] + ex[i]) / 2;
        its.forEach((it, i) => { it.style.transform = `translateX(${sh[i].toFixed(2)}px) scale(${sc[i].toFixed(3)})`; });
        if (tp && tp.offsetParent) {
          if (mag > 0.55) {
            const r = its[k].getBoundingClientRect(), pr = tp.offsetParent.getBoundingClientRect();
            const nm = its[k].dataset.name || '';
            if (tp.textContent !== nm) tp.textContent = nm;
            tp.style.transform = `translate(${(r.left + r.width / 2 - pr.left).toFixed(1)}px,${(r.top - pr.top - 10).toFixed(1)}px) translate(-50%,-100%)`;
            tp.style.opacity = '1';
          } else tp.style.opacity = '0';
        }
      } else if (magOn) {
        magOn = false; mag = 0;
        kids().forEach((it) => (it.style.transform = ''));
        if (tp) tp.style.opacity = '0';
      }
      raf = requestAnimationFrame(tick);
    };

    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      drag = true; lastX = px = e.clientX; lastT = performance.now(); vel = 0;
      bx.classList.add('dragging');
      try { bx.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    };
    const move = (e: PointerEvent) => {
      px = e.clientX;
      if (!drag) return;
      const t = performance.now(), dx = e.clientX - lastX, dtm = Math.max(1, t - lastT);
      x += dx; vel = 0.8 * (dx / dtm) * 1000 + 0.2 * vel;
      lastX = e.clientX; lastT = t;
    };
    const up = () => {
      if (!drag) return;
      drag = false; bx.classList.remove('dragging');
      v = performance.now() - lastT > 120 ? 0 : Math.max(-2600, Math.min(2600, vel));
    };
    const enter = (e: PointerEvent) => { hover = e.pointerType !== 'touch'; px = e.clientX; };
    const leave = () => { hover = false; up(); };
    const noDrag = (e: Event) => e.preventDefault();

    bx.addEventListener('pointerdown', down);
    bx.addEventListener('pointermove', move);
    bx.addEventListener('pointerup', up);
    bx.addEventListener('pointercancel', up);
    bx.addEventListener('pointerenter', enter);
    bx.addEventListener('pointerleave', leave);
    bx.addEventListener('dragstart', noDrag);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      bx.removeEventListener('pointerdown', down);
      bx.removeEventListener('pointermove', move);
      bx.removeEventListener('pointerup', up);
      bx.removeEventListener('pointercancel', up);
      bx.removeEventListener('pointerenter', enter);
      bx.removeEventListener('pointerleave', leave);
      bx.removeEventListener('dragstart', noDrag);
    };
  }, []);

  return (
    <>
      <span className="dock-tip" ref={tip} aria-hidden="true" />
      <div className="dock" ref={box} role="group" aria-label="Daily stack. Drag to scroll.">
        <div className="dock-track" ref={track}>
          {loop.map((k, i) => (
            <span key={i} className="dock-icon" data-name={ICONS[k].name} role="img" aria-label={ICONS[k].name} aria-hidden={i >= items.length ? true : undefined}>
              <TechIcon name={k} size={30} />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
