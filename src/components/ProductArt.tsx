import type { Category } from '../types';

/** Ilustração vetorial simples por categoria — evita depender de fotos. */
export function ProductArt({ category, colors, size = 88 }: { category: Category; colors: [string, string]; size?: number }) {
  const [a, b] = colors;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <ellipse cx="50" cy="86" rx="34" ry="6" fill="#000" opacity=".12" />
      {category === 'docinhos' && (<>
        <path d="M24 64 L30 84 H70 L76 64 Z" fill="#fff" stroke="#e8c9cf" strokeWidth="2" />
        <path d="M30 64 v18 M38 64 v20 M46 64 v20 M54 64 v20 M62 64 v20 M70 64 v18" stroke="#efd6da" strokeWidth="2" />
        <circle cx="50" cy="50" r="22" fill={a} />
        {[[42, 38], [56, 36], [48, 46], [60, 50], [38, 52], [52, 58]].map(([x, y], i) =>
          <rect key={i} x={x} y={y} width="5" height="2.4" rx="1.2" fill={b} transform={`rotate(${i * 37} ${x} ${y})`} />)}
        <ellipse cx="42" cy="40" rx="6" ry="3.5" fill="#fff" opacity=".3" />
      </>)}
      {category === 'bolos' && (<>
        <path d="M16 54 L50 36 L84 54 V80 L50 90 L16 80 Z" fill={a} />
        <path d="M50 70 L84 58 V80 L50 90 Z" fill="#000" opacity=".12" />
        <path d="M16 54 L50 70 V90 L16 80 Z" fill={a} />
        <path d="M16 64 L50 78 L84 66" stroke={b} strokeWidth="4" fill="none" />
        <path d="M16 54 L50 36 L84 54 L50 70 Z" fill={b} />
        <circle cx="50" cy="48" r="6" fill="#d1345b" />
        <path d="M50 42 q3 -6 7 -6" stroke="#5c8a3a" strokeWidth="2" fill="none" />
      </>)}
      {category === 'tortas' && (<>
        <path d="M14 60 L50 40 L86 60 L80 80 L50 88 L20 80 Z" fill="#c9935a" />
        <path d="M20 62 L50 46 L80 62 L50 76 Z" fill={a} />
        <path d="M20 62 L50 76 L80 62 L78 72 L50 82 L22 72 Z" fill={b} opacity=".55" />
        {[[38, 56], [50, 52], [62, 56], [50, 62], [44, 60], [56, 60]].map(([x, y], i) =>
          <circle key={i} cx={x} cy={y} r="4" fill={b} />)}
        <path d="M14 60 L50 40 L86 60" stroke="#a8743f" strokeWidth="4" fill="none" strokeLinecap="round" />
      </>)}
      {category === 'sobremesas' && (<>
        <path d="M26 40 H74 L68 82 Q50 90 32 82 Z" fill="#fff" opacity=".7" stroke="#e8c9cf" strokeWidth="2" />
        <path d="M28 52 H72 L68 82 Q50 90 32 82 Z" fill={a} />
        <path d="M29 62 H71 L70 70 H30 Z" fill={b} opacity=".7" />
        <path d="M30 46 Q50 30 70 46 Q50 54 30 46 Z" fill={b} />
        <circle cx="54" cy="36" r="5" fill="#d1345b" />
        <path d="M36 50 V78" stroke="#fff" strokeWidth="3" opacity=".45" strokeLinecap="round" />
      </>)}
    </svg>
  );
}
