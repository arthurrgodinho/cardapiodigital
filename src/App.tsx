import { useEffect, useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Cart } from './components/Cart';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { STORE } from './config';

const ROUTES = ['inicio', 'sobre'] as const;
type Route = typeof ROUTES[number];
const read = (): Route => { const h = location.hash.slice(1); return (ROUTES as readonly string[]).includes(h) ? h as Route : 'inicio'; };

export default function App() {
  const [route, setRoute] = useState<Route>(read);
  useEffect(() => {
    const on = () => { setRoute(read()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  return (
    <CartProvider>
      <Header route={route} />
      <main>{route === 'sobre' ? <About /> : <Home />}</main>
      <footer className="footer">{STORE.name} · {STORE.city} · {STORE.hours}</footer>
      <Cart />
    </CartProvider>
  );
}
