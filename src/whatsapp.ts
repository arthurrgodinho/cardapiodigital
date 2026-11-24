import { STORE, brl } from './config';
import type { CartItem } from './types';

export interface OrderInfo { name: string; delivery: 'retirada' | 'entrega'; address: string; date: string; notes: string; }

export const fmtDate = (iso: string) => iso ? iso.split('-').reverse().join('/') : '';

export function buildMessage(items: CartItem[], total: number, info: OrderInfo): string {
  const lines = [
    `Olá, ${STORE.owner}! Gostaria de fazer um pedido na *${STORE.name}* 🍰`,
    '',
    '*Itens:*',
    ...items.map(i => `• ${i.qty}x ${i.product.name} (${i.options ?? i.product.unit}) — ${brl(i.qty * i.price)}`),
    '',
    `*Total: ${brl(total)}*`,
    '',
    `*Nome:* ${info.name}`,
    `*Recebimento:* ${info.delivery === 'entrega' ? `Entrega — ${info.address}` : 'Retirada no ateliê'}`,
    `*Data desejada:* ${fmtDate(info.date)} (sujeita à confirmação de disponibilidade)`,
  ];
  if (info.notes.trim()) lines.push(`*Observações:* ${info.notes.trim()}`);
  return lines.join('\n');
}

export const whatsappLink = (msg: string) => `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`;
