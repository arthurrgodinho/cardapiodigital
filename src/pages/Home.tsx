import { useMemo, useState } from 'react';
import { CATEGORIES, STORE } from '../config';
import { PRODUCTS } from '../data/products';
import type { Category } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductArt } from '../components/ProductArt';
import portrait from '../assets/brand/confeiteira.webp';
import { CustomCakeCard } from '../components/CustomCakeCard';
import { CUSTOM_CAKE } from '../data/customCake';

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function Home() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<Category | 'todos'>('todos');

  const filtered = useMemo(() => {
    const term = norm(q.trim());
    return PRODUCTS.filter(p =>
      (cat === 'todos' || p.category === cat) &&
      (!term || norm(`${p.name} ${p.description} ${p.category}`).includes(term)));
  }, [q, cat]);

  return (<>
    <section className="hero">
      <div className="hero-text">
        <p className="kicker">Confeitaria artesanal · {STORE.city}</p>
        <h1>Doces feitos à mão, um de cada vez.</h1>
        <p>Receitas de família, chocolate de verdade e frutas da estação. Monte seu pedido e finalize direto no WhatsApp.</p>
        <button className="btn-primary" onClick={() => document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' })}>Fazer meu pedido</button>
      </div>
      <div className="hero-art">
        <span className="blob" aria-hidden="true" />
        <img className="hero-lia" src={portrait} alt={`${STORE.owner}, a confeiteira`} />
        <span className="orbit o-bolo" aria-hidden="true"><ProductArt category="bolos" colors={['#f7f0ee', '#e0405f']} size={130} /></span>
        <span className="orbit o-doce" aria-hidden="true"><ProductArt category="docinhos" colors={['#4a2418', '#7a3d26']} size={84} /></span>
        <span className="orbit o-torta" aria-hidden="true"><ProductArt category="tortas" colors={['#f2e3d0', '#9e1b3c']} size={100} /></span>
        <div className="hello-tag" aria-hidden="true">
          <small>Oi, eu sou a</small>
          <strong>{STORE.owner.split(' ')[0]}!</strong>
        </div>
      </div>
    </section>

    <section className="menu" id="cardapio" aria-label="Cardápio">
      <div className="tools">
        <label className="search">
          <span className="sr">Pesquisar produtos</span>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar: pistache, limão, chocolate…" />
          {q && <button onClick={() => setQ('')} aria-label="Limpar busca">×</button>}
        </label>
        <div className="chips" role="tablist" aria-label="Categorias">
          {[{ id: 'todos' as const, label: 'Todos' }, ...CATEGORIES].map(c => (
            <button key={c.id} role="tab" aria-selected={cat === c.id} className="chip" onClick={() => setCat(c.id)}>{c.label}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="empty">
          <p>Nenhum doce encontrado para “{q}”.</p>
          <button className="btn-outline" onClick={() => { setQ(''); setCat('todos'); }}>Ver cardápio completo</button>
        </div>
      )}

      {CATEGORIES.map(c => {
        const list = filtered.filter(p => p.category === c.id);
        if (!list.length) return null;
        return (
          <div key={c.id} className="group">
            <h2>{c.label} <small>{list.length}</small></h2>
            <div className="grid">{list.map(p => p.id === CUSTOM_CAKE.id ? <CustomCakeCard key={p.id} /> : <ProductCard key={p.id} product={p} />)}</div>
          </div>
        );
      })}
    </section>
  </>);
}
