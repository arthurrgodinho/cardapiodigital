/** Configurações da loja — edite aqui para personalizar o cardápio. */
export const STORE = {
  name: 'Doce Ofício',
  owner: 'Lia Moreira',
  /** Número do WhatsApp do proprietário: DDI + DDD + número, só dígitos */
  whatsapp: '5563991016156',
  city: 'São Paulo · SP',
  hours: 'Ter a sáb, 10h às 19h',
  minNotice: 'Bolos e tortas inteiros: encomende com 48h de antecedência.',
};

export const CATEGORIES: { id: import('./types').Category; label: string }[] = [
  { id: 'docinhos', label: 'Docinhos' },
  { id: 'bolos', label: 'Bolos' },
  { id: 'tortas', label: 'Tortas' },
  { id: 'sobremesas', label: 'Sobremesas' },
];

export const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
