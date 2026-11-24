import type { Product } from '../types';
import { CUSTOM_CAKE } from './customCake';

export const PRODUCTS: Product[] = [
  // Docinhos
  { id: 'brig-belga', category: 'docinhos', name: 'Brigadeiro belga', unit: 'un', price: 4.5, colors: ['#4a2418', '#7a3d26'],
    description: 'Chocolate belga 54% cacau, enrolado à mão e finalizado com granulado de chocolate.' },
  { id: 'beijinho', category: 'docinhos', name: 'Beijinho de coco queimado', unit: 'un', price: 4, colors: ['#f3e6d3', '#c99a62'],
    description: 'Leite condensado e coco fresco levemente tostado, com cravo na medida certa.' },
  { id: 'pistache', category: 'docinhos', name: 'Brigadeiro de pistache', unit: 'un', price: 6, colors: ['#a8c98f', '#6f9a55'],
    description: 'Creme de pistache siciliano e pistache triturado por fora.' },
  { id: 'cajuzinho', category: 'docinhos', name: 'Cajuzinho', unit: 'un', price: 4, colors: ['#c98a4b', '#8a5228'],
    description: 'Amendoim torrado e chocolate meio amargo, com castanha de caju no topo.' },
  { id: 'camafeu', category: 'docinhos', name: 'Camafeu de nozes', unit: 'un', price: 6.5, colors: ['#f6ecd9', '#a0743f'],
    description: 'Massa de nozes com fondant acetinado e meia noz pecã.' },
  { id: 'cento-mix', category: 'docinhos', name: 'Cento sortido', unit: 'cento', price: 420, colors: ['#d1345b', '#4a2418'],
    description: 'Cem docinhos em até 4 sabores à sua escolha, em forminhas de papel.' },
  // Bolos
  CUSTOM_CAKE,
  { id: 'bolo-cenoura', category: 'bolos', name: 'Bolo de cenoura com brigadeiro', unit: 'fatia', price: 14, colors: ['#f08a3c', '#4a2418'],
    description: 'Massa fofinha de cenoura com cobertura generosa de brigadeiro de colher.' },
  { id: 'red-velvet', category: 'bolos', name: 'Red velvet', unit: 'fatia', price: 18, colors: ['#b3203f', '#f7efe9'],
    description: 'Massa aveludada com cacau e recheio de cream cheese com baunilha.' },
  { id: 'bolo-morango', category: 'bolos', name: 'Bolo de morango com chantilly', unit: 'inteiro 1,5 kg', price: 165, colors: ['#f7f0ee', '#e0405f'],
    description: 'Pão de ló de baunilha, morangos frescos e chantilly batido na hora. Serve 15 pessoas.' },
  { id: 'bolo-laranja', category: 'bolos', name: 'Bolo de laranja', unit: 'fatia', price: 10, colors: ['#f5b440', '#e07b1a'],
    description: 'Bolo caseiro feito com suco da fruta e calda cítrica.' },
  { id: 'nega-maluca', category: 'bolos', name: 'Nega maluca', unit: 'inteiro 1 kg', price: 89, colors: ['#3b1d14', '#5e2f1f'],
    description: 'Bolo de chocolate úmido com calda brilhante de chocolate. Serve 10 pessoas.' },
  // Tortas
  { id: 'torta-limao', category: 'tortas', name: 'Torta de limão', unit: 'fatia', price: 16, colors: ['#f4f0c8', '#c9a46a'],
    description: 'Massa amanteigada, creme de limão-taiti e merengue suíço maçaricado.' },
  { id: 'banoffee', category: 'tortas', name: 'Banoffee', unit: 'fatia', price: 17, colors: ['#e8c48a', '#8a5a2b'],
    description: 'Base crocante, doce de leite, banana e chantilly com canela.' },
  { id: 'torta-holandesa', category: 'tortas', name: 'Torta holandesa', unit: 'inteira 20 cm', price: 140, colors: ['#f5ead6', '#3b1d14'],
    description: 'Creme leve de baunilha, biscoito champanhe e ganache de chocolate meio amargo.' },
  { id: 'torta-frutas', category: 'tortas', name: 'Torta de frutas vermelhas', unit: 'fatia', price: 19, colors: ['#f2e3d0', '#9e1b3c'],
    description: 'Creme de confeiteiro com framboesa, mirtilo e morango sobre massa sablée.' },
  // Sobremesas
  { id: 'pudim', category: 'sobremesas', name: 'Pudim de leite', unit: 'porção', price: 13, colors: ['#f3c76d', '#a0561c'],
    description: 'Lisinho, sem furinhos, com calda de caramelo no ponto.' },
  { id: 'pave', category: 'sobremesas', name: 'Pavê de chocolate no pote', unit: '250 ml', price: 15, colors: ['#f5ead6', '#5e2f1f'],
    description: 'Camadas de creme, biscoito molhado no café e ganache.' },
  { id: 'mousse', category: 'sobremesas', name: 'Mousse de maracujá', unit: '200 ml', price: 12, colors: ['#f8dc6a', '#e3a400'],
    description: 'Aerada e azedinha, com calda da polpa e sementes.' },
  { id: 'cheesecake', category: 'sobremesas', name: 'Cheesecake de goiabada', unit: 'pote', price: 16, colors: ['#f7efe2', '#c2264a'],
    description: 'Creme de cream cheese assado e goiabada cascão derretida.' },
];
