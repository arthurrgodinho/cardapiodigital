import { useState } from 'react';

const MONTHS = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const WEEK = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
/** Dias da semana fechados (0 = domingo, 1 = segunda) — o ateliê abre de terça a sábado */
export const CLOSED_DAYS = [0, 1];

const iso = (d: Date) => d.toLocaleDateString('sv-SE');
const fromIso = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };

interface Props { value: string; min: string; onChange: (iso: string) => void; label: string; }

/** Calendário próprio: funciona igual em todos os navegadores e bloqueia dias fechados. */
export function DatePicker({ value, min, onChange, label }: Props) {
  const [open, setOpen] = useState(false);
  const start = fromIso(value || min);
  const [view, setView] = useState({ y: start.getFullYear(), m: start.getMonth() });

  const minD = fromIso(min);
  const first = new Date(view.y, view.m, 1);
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (Date | null)[] = [...Array(first.getDay()).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.y, view.m, i + 1))];
  const canPrev = new Date(view.y, view.m, 0) >= minD;
  const move = (n: number) => setView(v => { const d = new Date(v.y, v.m + n, 1); return { y: d.getFullYear(), m: d.getMonth() }; });

  const shown = value ? fromIso(value).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Escolher data';

  return (
    <div className="datepicker">
      <span className="dp-label">{label}</span>
      <button type="button" className={`dp-field${value ? '' : ' empty'}`} aria-expanded={open} onClick={() => setOpen(o => !o)}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        <span>{shown}</span>
      </button>
      {open && (
        <div className="dp-pop" role="dialog" aria-label="Calendário">
          <div className="dp-head">
            <button type="button" onClick={() => move(-1)} disabled={!canPrev} aria-label="Mês anterior">‹</button>
            <strong>{MONTHS[view.m]} {view.y}</strong>
            <button type="button" onClick={() => move(1)} aria-label="Próximo mês">›</button>
          </div>
          <div className="dp-grid">
            {WEEK.map((w, i) => <span key={i} className="dp-wd">{w}</span>)}
            {cells.map((d, i) => {
              if (!d) return <span key={i} />;
              const k = iso(d);
              const disabled = d < minD || CLOSED_DAYS.includes(d.getDay());
              return (
                <button type="button" key={i} disabled={disabled} aria-pressed={k === value}
                  aria-label={d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
                  onClick={() => { onChange(k); setOpen(false); }}>{d.getDate()}</button>
              );
            })}
          </div>
          <p className="dp-foot">Atendemos de terça a sábado.</p>
        </div>
      )}
    </div>
  );
}
