import type { Product } from '../types';

/** Bolo montado pelo cliente. O preço final = preço por kg × peso + adicionais. */
export const CUSTOM_CAKE: Product = {
  id: 'bolo-encomenda', category: 'bolos', name: 'Bolo sob encomenda', unit: 'kg', price: 110,
  colors: ['#f7d6de', '#d1345b'],
  description: 'Monte o seu: escolha massa, recheio, cobertura e peso. Encomende com 48h de antecedência.',
};

export const CAKE_OPTIONS = {
  massa: ['Baunilha', 'Chocolate', 'Red velvet', 'Cenoura', 'Coco'],
  recheio: [
    { name: 'Brigadeiro', extra: 0 }, { name: 'Ninho', extra: 0 }, { name: 'Doce de leite', extra: 0 },
    { name: 'Ninho com morango', extra: 15 }, { name: 'Pistache', extra: 30 }, { name: 'Frutas vermelhas', extra: 20 },
  ],
  cobertura: ['Chantilly', 'Ganache', 'Buttercream', 'Naked (sem cobertura)'],
  /** Peso em kg e quantas pessoas serve, aproximadamente */
  peso: [{ kg: 1, serves: 10 }, { kg: 1.5, serves: 15 }, { kg: 2, serves: 20 }, { kg: 3, serves: 30 }, { kg: 4, serves: 40 }],
};

export const kg = (n: number) => `${n.toLocaleString('pt-BR')} kg`;
