import type { Product } from '../types';
import { brl } from '../config';
import { useCart } from '../context/CartContext';
import { ProductImage } from './ProductImage';
import { Stepper } from './Stepper';

export function ProductCard({ product }: { product: Product }) {
  const { qtyOf, add, setQty } = useCart();
  const qty = qtyOf(product.id);
  return (
    <article className={`card${qty ? ' in-cart' : ''}`}>
      <ProductImage product={product} size={220} />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="card-foot">
          <span className="price">{brl(product.price)}<small> / {product.unit}</small></span>
          {qty === 0
            ? <button className="btn-add" onClick={() => add(product)} aria-label={`Adicionar ${product.name}`}>Adicionar</button>
            : <Stepper value={qty} onChange={v => setQty(product.id, v)} label={product.name} />}
        </div>
      </div>
    </article>
  );
}
