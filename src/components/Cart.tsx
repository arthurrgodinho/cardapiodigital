import { useEffect, useState } from 'react';
import { brl, STORE } from '../config';
import { useCart } from '../context/CartContext';
import { buildMessage, whatsappLink, type OrderInfo } from '../whatsapp';
import { Stepper } from './Stepper';
import { ProductImage } from './ProductImage';
import { DatePicker, CLOSED_DAYS } from './DatePicker';

/** Barra do carrinho fixa no rodapé (sempre visível) + painel de finalização. */
export function Cart() {
  const { items, count, total, setQty, remove, clear } = useCart();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<OrderInfo>({ name: '', delivery: 'retirada', address: '', date: '', notes: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => { if (!count) setOpen(false); }, [count]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Itens feitos sob encomenda (bolo montado ou peças inteiras) pedem 2 dias de antecedência
  const needsNotice = items.some(i => i.product.id === 'bolo-encomenda' || /inteir|cento/.test(i.product.unit));
  const minDate = (() => { const d = new Date(); d.setDate(d.getDate() + (needsNotice ? 2 : 1)); while (CLOSED_DAYS.includes(d.getDay())) d.setDate(d.getDate() + 1); return d.toLocaleDateString('sv-SE'); })();
  const dateOk = !!info.date && info.date >= minDate;
  const valid = info.name.trim().length > 1 && dateOk && (info.delivery === 'retirada' || info.address.trim().length > 4);
  const missing = [info.name.trim().length > 1 ? '' : 'seu nome', dateOk ? '' : 'a data', info.delivery === 'entrega' && info.address.trim().length <= 4 ? 'o endereço' : ''].filter(Boolean);
  const link = whatsappLink(buildMessage(items, total, info));

  return (<>
    <div className="cartbar" role="region" aria-label="Carrinho">
      <div className="cartbar-info">
        <strong>{count ? `${count} ${count === 1 ? 'item' : 'itens'}` : 'Carrinho vazio'}</strong>
        <span>{count ? brl(total) : 'Escolha seus doces'}</span>
      </div>
      <button className="btn-primary" disabled={!count} onClick={() => { setSent(false); setOpen(true); }}>
        Ver pedido
      </button>
    </div>

    {open && (
      <div className="sheet-backdrop" onClick={() => setOpen(false)}>
        <section className="sheet" role="dialog" aria-modal="true" aria-label="Seu pedido" onClick={e => e.stopPropagation()}>
          <div className="sheet-head">
            <h2>Seu pedido</h2>
            <button className="btn-ghost" onClick={() => setOpen(false)} aria-label="Fechar">Fechar</button>
          </div>

          <ul className="lines">
            {items.map(({ key, product, qty, price, options }) => (
              <li key={key}>
                <ProductImage product={product} size={60} className="thumb" />
                <div className="line-info">
                  <strong>{product.name}</strong>
                  <span>{options ? `${options} · ${brl(price)}` : `${brl(price)} / ${product.unit}`}</span>
                </div>
                <span className="line-total">{brl(price * qty)}</span>
                <div className="line-actions">
                  <Stepper value={qty} onChange={v => setQty(key, v)} label={product.name} />
                  <button className="link" onClick={() => remove(key)}>Remover</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="sum"><span>Total</span><strong>{brl(total)}</strong></div>

          <form className="order-form" onSubmit={e => e.preventDefault()}>
            <label>Seu nome
              <input value={info.name} onChange={e => setInfo({ ...info, name: e.target.value })} autoComplete="name" placeholder="Como podemos te chamar?" />
            </label>
            <fieldset>
              <legend>Como prefere receber?</legend>
              {(['retirada', 'entrega'] as const).map(opt => (
                <label key={opt} className="radio">
                  <input type="radio" name="delivery" checked={info.delivery === opt} onChange={() => setInfo({ ...info, delivery: opt })} />
                  {opt === 'retirada' ? 'Retirar no ateliê' : 'Entrega (taxa a combinar)'}
                </label>
              ))}
            </fieldset>
            {info.delivery === 'entrega' && (
              <label>Endereço
                <input value={info.address} onChange={e => setInfo({ ...info, address: e.target.value })} autoComplete="street-address" placeholder="Rua, número, bairro" />
              </label>
            )}
            <DatePicker label={`Data de ${info.delivery === 'entrega' ? 'entrega' : 'retirada'}`} value={info.date} min={minDate}
              onChange={date => setInfo({ ...info, date })} />
            <p className="notice">
              A data escolhida é uma preferência, <strong>não confirma a encomenda</strong>. A disponibilidade será verificada e confirmada pelo WhatsApp.
              {needsNotice && ' Seu pedido tem itens sob encomenda: mínimo de 48h de antecedência.'}
            </p>
            <label>Observações <small>(opcional)</small>
              <textarea rows={2} value={info.notes} onChange={e => setInfo({ ...info, notes: e.target.value })} placeholder="Horário preferido, sabores do cento, alergias…" />
            </label>
            <p className="hint">{STORE.minNotice}</p>
            <a className={`btn-whats${valid ? '' : ' disabled'}`} href={valid ? link : undefined} target="_blank" rel="noopener noreferrer"
               aria-disabled={!valid} onClick={e => { if (!valid) e.preventDefault(); else setSent(true); }}>
              Enviar pedido pelo WhatsApp
            </a>
            {!valid && <p className="hint">Para enviar, preencha {missing.join(', ').replace(/, ([^,]*)$/, ' e $1')}.</p>}
            {sent && (
              <p className="sent">O WhatsApp foi aberto com seu pedido. Depois de enviar a mensagem,{' '}
                <button type="button" className="link" onClick={() => { clear(); setOpen(false); }}>limpe o carrinho</button>.
              </p>
            )}
          </form>
        </section>
      </div>
    )}
  </>);
}
