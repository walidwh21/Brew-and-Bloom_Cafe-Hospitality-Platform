import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Tag, ShoppingBag, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import PageLayout from '../components/layout/PageLayout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { validateCoupon, placeOrder as submitOrderApi } from '../api/orders';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const { items, subtotal, discount, tax, total, coupon, setCoupon, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const applyCoupon = async () => {
    setCouponError('');
    try {
      const res = await validateCoupon(couponCode, subtotal);
      if (res.valid) setCoupon({ code: couponCode, discount: res.discount, data: res.coupon });
    } catch {
      setCouponError('Invalid coupon code.');
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const order = await submitOrderApi({
        items: items.map((i) => ({ product_id: i.product.id, quantity: i.quantity })),
        coupon_code: coupon?.code,
        payment_method: 'card',
        notes,
      });
      clearCart();
      setOrderSuccess(order);
    } catch (err) {
      alert(err.response?.data?.message || 'Order failed.');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <PageLayout subtitle="Success" title="Order Confirmed" image="/images/experience/cozy-interiors.png">
        <div className="inner-card mx-auto max-w-lg text-center">
          <CheckCircle className="mx-auto h-14 w-14 text-gold" />
          <p className="mt-6 text-espresso/60">
            Thank you! Order <strong>{orderSuccess.order_number}</strong> has been placed.
          </p>
          <Link to="/profile" className="mt-8 inline-block">
            <Button variant="gold">View Orders</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  if (items.length === 0) {
    return (
      <PageLayout subtitle="Cart" title="Your Order" description="Nothing here yet — let's fix that!">
        <div className="inner-card mx-auto max-w-lg text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gold/50" />
          <p className="mt-4 text-espresso/60">Discover our menu and add something delightful.</p>
          <Link to="/menu" className="mt-8 inline-block">
            <Button variant="gold">Browse Menu</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      subtitle="Checkout"
      title="Your Order"
      description={`${items.length} item${items.length > 1 ? 's' : ''} in your cart`}
      wide
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div key={item.product.id} className="inner-card flex flex-wrap items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gold/15 font-display text-2xl text-espresso">
                {item.product.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg">{item.product.name}</h3>
                <p className="text-sm text-gold">{formatPrice(item.product.price)} each</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-espresso/10 px-2 py-1">
                <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="rounded-full p-1 hover:bg-espresso/5">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="rounded-full p-1 hover:bg-espresso/5">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
              <button type="button" onClick={() => removeItem(item.product.id)} className="text-burgundy/60 hover:text-burgundy">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="inner-card h-fit lg:sticky lg:top-28">
          <h3 className="font-display text-xl text-espresso">Order Summary</h3>

          <div className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso/40" />
              <input className="input-luxury !pl-10 !py-2.5" placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} />
            </div>
            <Button variant="secondary" onClick={applyCoupon}>Apply</Button>
          </div>
          {couponError && <p className="mt-2 text-sm text-burgundy">{couponError}</p>}
          {coupon && <p className="mt-2 text-sm text-sage">Coupon applied: -{formatPrice(discount)}</p>}

          <textarea className="input-luxury mt-4" placeholder="Special instructions (optional)" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />

          <div className="mt-6 space-y-2 border-t border-espresso/10 pt-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between text-sage"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
            <div className="flex justify-between"><span>GST (5%)</span><span>{formatPrice(tax)}</span></div>
            <div className="flex justify-between border-t border-espresso/10 pt-2 font-display text-xl"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>

          {user ? (
            <Button variant="gold" className="mt-6 w-full" onClick={handlePlaceOrder} loading={loading}>Place Order</Button>
          ) : (
            <Link to="/login" className="mt-6 block">
              <Button variant="gold" className="w-full">Sign In to Order</Button>
            </Link>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
