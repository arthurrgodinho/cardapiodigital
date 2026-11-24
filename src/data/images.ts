/**
 * Fotos dos produtos. Para adicionar uma foto, salve-a em src/assets/products
 * com o id do produto como nome (ex.: red-velvet.webp ou red-velvet.jpg).
 * Produtos sem foto continuam com a ilustração.
 */
const files = import.meta.glob('../assets/products/*.{webp,jpg,jpeg,png}', { eager: true, import: 'default' }) as Record<string, string>;

export const PRODUCT_IMAGES: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), url]),
);
