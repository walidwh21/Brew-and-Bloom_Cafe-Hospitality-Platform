/**
 * PRODUCT CARD — one menu item with Add button
 * Used on Menu page. Parent passes product + onAddToCart function.
 */
import { Star } from 'lucide-react';
import Button from './ui/Button';
import { formatPrice } from '../utils/formatPrice';

export function ProductCard({ product, onAddToCart }) {
  return (
    <div className="group card-luxury overflow-hidden !p-0">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cream-dark to-gold/20">
        {product.is_featured && (
          <span className="absolute left-4 top-4 z-10 flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-medium text-espresso">
            <Star className="h-3 w-3" fill="currentColor" />
            Featured
          </span>
        )}
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-6xl text-espresso/10">{product.name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="text-xs uppercase tracking-widest text-gold">{product.category?.name || 'Specialty'}</p>
        <h3 className="mt-1 font-display text-xl text-espresso">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-espresso/60">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-2xl text-espresso">{formatPrice(product.price)}</span>
          <Button variant="gold" className="!px-4 !py-2 text-xs" onClick={() => onAddToCart?.(product)}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
