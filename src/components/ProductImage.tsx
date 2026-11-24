import type { Product } from '../types';
import { PRODUCT_IMAGES } from '../data/images';
import { ProductArt } from './ProductArt';

/** Foto do produto quando existe; senão, a ilustração vetorial. */
export function ProductImage({ product, size, className = 'card-art' }: { product: Product; size: number; className?: string }) {
  const src = PRODUCT_IMAGES[product.id];
  return (
    <div className={`${className}${src ? ' has-photo' : ''}`}
      style={src ? undefined : { background: `radial-gradient(circle at 50% 40%, #fff, ${product.colors[0]}33)` }}>
      {src ? <img src={src} alt={product.name} loading="lazy" /> : <ProductArt category={product.category} colors={product.colors} size={size} />}
    </div>
  );
}
