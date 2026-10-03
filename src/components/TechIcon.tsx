import { ICONS, type IconKey } from '@/data/icons';

export default function TechIcon({ name, size = 22 }: { name: IconKey; size?: number }) {
  const i = ICONS[name];
  const col = i.ink ? 'currentColor' : i.color;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ display: 'block', flex: 'none' }}>
      {i.fill ? <path d={i.path} fill={col} /> : <path d={i.path} fill="none" stroke={col} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}
