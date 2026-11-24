import { useState } from 'react';
import { brl } from '../config';
import { useCart } from '../context/CartContext';
import { CAKE_OPTIONS, CUSTOM_CAKE, kg } from '../data/customCake';
import { ProductImage } from './ProductImage';

export function CustomCakeCard() {
  const { add, items } = useCart();
  const [massa, setMassa] = useState(CAKE_OPTIONS.massa[0]);
  const [recheio, setRecheio] = useState(CAKE_OPTIONS.recheio[0].name);
  const [cobertura, setCobertura] = useState(CAKE_OPTIONS.cobertura[0]);
  const [peso, setPeso] = useState(CAKE_OPTIONS.peso[1].kg);
  const [added, setAdded] = useState(false);

  const extra = CAKE_OPTIONS.recheio.find(r => r.name === recheio)?.extra ?? 0;
  const price = CUSTOM_CAKE.price * peso + extra * peso;
  const options = `Massa ${massa} · Recheio ${recheio} · ${cobertura} · ${kg(peso)}`;
  const inCart = items.filter(i => i.product.id === CUSTOM_CAKE.id).reduce((s, i) => s + i.qty, 0);

  const onAdd = () => { add(CUSTOM_CAKE, { price, options }); setAdded(true); setTimeout(() => setAdded(false), 1600); };
  const sel = (label: string, value: string, set: (v: string) => void, opts: { v: string; t: string }[]) => (
    <label className="field">{label}
      <select value={value} onChange={e => set(e.target.value)}>{opts.map(o => <option key={o.v} value={o.v}>{o.t}</option>)}</select>
    </label>
  );

  return (
    <article className={`card custom${inCart ? ' in-cart' : ''}`}>
      <ProductImage product={CUSTOM_CAKE} size={220} />
      <div className="card-body">
        <h3>{CUSTOM_CAKE.name}</h3>
        <p>{CUSTOM_CAKE.description}</p>
        <div className="fields">
          {sel('Massa', massa, setMassa, CAKE_OPTIONS.massa.map(m => ({ v: m, t: m })))}
          {sel('Recheio', recheio, setRecheio, CAKE_OPTIONS.recheio.map(r => ({ v: r.name, t: r.extra ? `${r.name} (+${brl(r.extra)}/kg)` : r.name })))}
          {sel('Cobertura', cobertura, setCobertura, CAKE_OPTIONS.cobertura.map(c => ({ v: c, t: c })))}
          {sel('Peso', String(peso), v => setPeso(Number(v)), CAKE_OPTIONS.peso.map(p => ({ v: String(p.kg), t: `${kg(p.kg)} · serve ~${p.serves}` })))}
        </div>
        <div className="card-foot">
          <span className="price">{brl(price)}<small> · a partir de {brl(CUSTOM_CAKE.price)}/kg</small></span>
          <button className="btn-add" onClick={onAdd}>{added ? 'Adicionado ✓' : 'Adicionar'}</button>
        </div>
        {inCart > 0 && <p className="in-cart-note">{inCart} no carrinho — ajuste no pedido.</p>}
      </div>
    </article>
  );
}
