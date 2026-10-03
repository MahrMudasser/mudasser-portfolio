import { useId, useState } from 'react';

/** One answer open at a time; the panel opens with a smooth height change. */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((it, i) => {
        const isOpen = open === i, bid = `${base}-q${i}`, pid = `${base}-a${i}`;
        return (
          <div key={it.q} className={`faq-item${isOpen ? ' open' : ''}`}>
            <h3 style={{ margin: 0 }}>
              <button type="button" id={bid} className="faq-q" aria-expanded={isOpen} aria-controls={pid} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{it.q}</span>
                <svg className="faq-x" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" /></svg>
              </button>
            </h3>
            <div className="faq-a" id={pid} role="region" aria-labelledby={bid}><div><p>{it.a}</p></div></div>
          </div>
        );
      })}
    </div>
  );
}
