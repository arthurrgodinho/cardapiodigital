import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartItem, Product } from '../types';

interface CartCtx {
  items: CartItem[];
  count: number;
  total: number;
  qtyOf: (id: string) => number;
  add: (p: Product, custom?: { price: number; options: string }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = 'doce-oficio-cart';

function load(): CartItem[] {
  try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) && v.every(i => i.key) ? v : []; } catch { return []; }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load);

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* sem storage */ } }, [items]);

  const value = useMemo<CartCtx>(() => {
    const setQty = (key: string, qty: number) =>
      setItems(cur => qty <= 0 ? cur.filter(i => i.key !== key) : cur.map(i => i.key === key ? { ...i, qty } : i));
    return {
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      total: items.reduce((s, i) => s + i.qty * i.price, 0),
      qtyOf: key => items.find(i => i.key === key)?.qty ?? 0,
      add: (p, custom) => {
        const key = custom ? `${p.id}|${custom.options}` : p.id;
        setItems(cur => cur.some(i => i.key === key)
          ? cur.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
          : [...cur, { key, product: p, qty: 1, price: custom?.price ?? p.price, options: custom?.options }]);
      },
      remove: id => setQty(id, 0),
      setQty,
      clear: () => setItems([]),
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCart precisa estar dentro de CartProvider');
  return c;
}
