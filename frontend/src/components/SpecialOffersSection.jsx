/**
 * SPECIAL OFFERS SLIDER (homepage)
 *
 * Loads active coupons from database → Admin → Coupons
 * Simple slider: show one coupon at a time, prev/next buttons
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Gift, Sparkles } from 'lucide-react';
import Button from './ui/Button';
import { getActiveCoupons } from '../api/coupons';
import { formatPrice } from '../utils/formatPrice';

export default function SpecialOffersSection() {
  const [coupons, setCoupons] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const data = await getActiveCoupons();
        setCoupons(data);
      } catch {
        setCoupons([]);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (coupons.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % coupons.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [coupons.length]);

  if (coupons.length === 0) {
    return (
      <section className="offers-section">
        <div className="mx-auto max-w-7xl px-4 py-24 text-center md:px-8">
          <p className="section-subtitle">Limited Time</p>
          <h2 className="section-title">Special Offers</h2>
          <p className="mx-auto mt-4 max-w-lg text-espresso/55">
            No active coupons yet. Add them in Admin → Coupons.
          </p>
        </div>
      </section>
    );
  }

  const coupon = coupons[activeIndex];
  const discountLabel = coupon.type === 'percentage'
    ? `${coupon.value}% off`
    : `${formatPrice(coupon.value)} off`;
  const theme = ['burgundy', 'gold', 'sage'][activeIndex % 3];

  function goPrev() {
    setActiveIndex((i) => (i - 1 + coupons.length) % coupons.length);
  }

  function goNext() {
    setActiveIndex((i) => (i + 1) % coupons.length);
  }

  return (
    <section className="offers-section">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="text-center">
          <p className="section-subtitle">Limited Time</p>
          <h2 className="section-title">Special Offers</h2>
        </div>

        <div className="offers-slider mt-14">
          <button type="button" onClick={goPrev} className="offers-nav-btn offers-nav-prev" aria-label="Previous">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="offers-track">
            <article className={`offer-card offer-card-${theme}`}>
              <div className="offer-card-glow" aria-hidden="true" />
              <div className="offer-card-inner">
                <div className="offer-card-left">
                  <span className="offer-badge">{coupon.code}</span>
                  <div className="offer-icon-wrap"><Gift className="h-8 w-8" strokeWidth={1.5} /></div>
                  <h3 className="offer-title">{coupon.description || coupon.code}</h3>
                  <p className="offer-tagline">{discountLabel}</p>
                </div>
                <div className="offer-card-right">
                  <p className="offer-description">
                    Enjoy this deal at Brew & Bloom. Minimum order {formatPrice(coupon.min_order)}.
                  </p>
                  <p className="offer-detail">
                    <Sparkles className="inline h-3.5 w-3.5 text-gold" />
                    {coupon.max_uses ? `Uses: ${coupon.used_count}/${coupon.max_uses}` : 'Available while stocks last'}
                  </p>
                  <p className="offer-code">
                    Use code <span className="offer-code-value">{coupon.code}</span> at checkout
                  </p>
                  <Link to="/menu" className="mt-8 inline-block">
                    <Button variant="gold">Order Now</Button>
                  </Link>
                </div>
              </div>
            </article>
          </div>

          <button type="button" onClick={goNext} className="offers-nav-btn offers-nav-next" aria-label="Next">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {coupons.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`offers-dot ${i === activeIndex ? 'offers-dot-active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
