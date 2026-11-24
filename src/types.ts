export type Category = 'docinhos' | 'bolos' | 'tortas' | 'sobremesas';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  /** Unidade de venda exibida ao lado do preço, ex.: "un", "fatia", "cento" */
  unit: string;
  category: Category;
  /** Cores usadas na ilustração do produto */
  colors: [string, string];
}

export interface CartItem {
  /** Chave única: id do produto + opções escolhidas */
  key: string;
  product: Product;
  qty: number;
  /** Preço unitário efetivo (pode variar conforme peso/opções) */
  price: number;
  /** Descrição das opções escolhidas, ex.: "Chocolate · Brigadeiro · 2 kg" */
  options?: string;
}
