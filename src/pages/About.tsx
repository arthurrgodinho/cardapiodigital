import { STORE } from '../config';
import portrait from '../assets/brand/confeiteira.webp';

export function About() {
  return (
    <article className="about">
      <div className="about-hero">
        <img className="portrait" src={portrait} alt={`${STORE.owner}, confeiteira da ${STORE.name}`} />
        <div>
          <p className="kicker">A pessoa por trás dos doces</p>
          <h1>Oi, eu sou a {STORE.owner.split(' ')[0]}.</h1>
        </div>
      </div>
      <p className="lead">A {STORE.name} nasceu na cozinha da minha avó, entre panelas de cobre e cadernos de receita manchados de calda. Em 2019 transformei o hobby de fim de semana em ateliê.</p>
      <p>Trabalho com produção pequena e sob encomenda: cada brigadeiro é enrolado à mão, as massas são batidas no dia e as frutas vêm de feira. Nada de conservantes nem pré-misturas.</p>

      <div className="values">
        <div><h3>Ingredientes de verdade</h3><p>Chocolate nobre, manteiga, ovos caipiras e frutas frescas.</p></div>
        <div><h3>Feito sob encomenda</h3><p>Produzimos para o seu dia, sem estoque parado.</p></div>
        <div><h3>Do jeito que você quer</h3><p>Sabores, tamanhos e embalagens ajustados à sua festa.</p></div>
      </div>

      <dl className="facts">
        <div><dt>Onde</dt><dd>{STORE.city} — retirada no ateliê ou entrega</dd></div>
        <div><dt>Quando</dt><dd>{STORE.hours}</dd></div>
        <div><dt>Encomendas</dt><dd>{STORE.minNotice}</dd></div>
      </dl>
      <a href="#inicio" className="btn-primary">Ver o cardápio</a>
      <p className="note">Marca e pessoa fictícias, criadas para demonstração.</p>
    </article>
  );
}
