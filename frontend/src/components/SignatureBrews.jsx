/**
 * SIGNATURE BREWS (homepage featured products)
 *
 * Parent Home.jsx loads products and passes them as props.
 * Mark products as "Featured" in admin to show here.
 */
import { Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './ui/Button';
import { formatPrice } from '../utils/formatPrice';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80';

export default function SignatureBrews({ products }) {
  const { addItem } = useCart();

  return (
    <section className="signature-brews-section">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="text-center">
          <p className="section-subtitle">Handcrafted Daily</p>
          <h2 className="section-title">Our Signature Brews</h2>
          <p className="mx-auto mt-4 max-w-lg text-espresso/60">
            Featured drinks from our menu — update them in Admin → Products.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-espresso/50">
              No featured products yet. Mark items as Featured in the admin panel.
            </p>
          ) : (
            products.map((product) => {
              const image = product.image || DEFAULT_IMAGE;
              return (
                <article key={product.id} className="signature-brew-card group">
                  <div className="signature-brew-image-wrap">
                    <img src={image} alt={product.name} className="signature-brew-image" />
                  </div>
                  <div className="signature-brew-body">
                    <h3 className="font-display text-xl text-espresso">{product.name}</h3>
                    {product.is_featured && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-gold">
                        <Star className="h-3 w-3" fill="currentColor" /> Featured
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-display text-2xl text-espresso">{formatPrice(product.price)}</span>
                      <Button variant="gold" className="!px-4 !py-2 text-xs" onClick={() => addItem(product)}>
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
