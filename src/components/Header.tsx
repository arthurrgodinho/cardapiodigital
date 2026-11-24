import { STORE } from '../config';

export function Header({ route }: { route: string }) {
  return (
    <header className="topbar">
      <a href="#inicio" className="logo">{STORE.name}</a>
      <nav>
        <a href="#inicio" aria-current={route === 'inicio' ? 'page' : undefined}>Cardápio</a>
        <a href="#sobre" aria-current={route === 'sobre' ? 'page' : undefined}>Sobre</a>
      </nav>
    </header>
  );
}
