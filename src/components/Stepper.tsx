export function Stepper({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="stepper" role="group" aria-label={`Quantidade de ${label}`}>
      <button onClick={() => onChange(value - 1)} aria-label="Diminuir"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg></button>
      <output aria-live="polite">{value}</output>
      <button onClick={() => onChange(value + 1)} aria-label="Aumentar"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg></button>
    </div>
  );
}
