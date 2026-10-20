/**
 * TESTIMONIALS SLIDER (homepage)
 *
 * Loads reviews from database → Admin → Testimonials
 * Simple slider: active index + prev/next buttons
 */
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { getTestimonials } from '../api/content';

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTestimonials();
        setReviews(data);
      } catch {
        setReviews([]);
      }
    }
    load();
  }, []);

  // Auto-advance every 7 seconds
  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  const review = reviews[activeIndex];

  function goPrev() {
    setActiveIndex((i) => (i - 1 + reviews.length) % reviews.length);
  }

  function goNext() {
    setActiveIndex((i) => (i + 1) % reviews.length);
  }

  return (
    <section className="testimonials-section">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="text-center">
          <p className="section-subtitle">Guest Voices</p>
          <h2 className="section-title">Testimonials</h2>
        </div>

        <div className="testimonials-slider mt-14">
          <button type="button" onClick={goPrev} className="testimonials-nav-btn" aria-label="Previous">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="testimonials-track">
            <article className="testimonial-card">
              <Quote className="testimonial-quote-icon" strokeWidth={1} />
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`text-lg ${star <= review.rating ? 'text-gold' : 'text-espresso/15'}`}>★</span>
                ))}
              </div>
              <blockquote className="testimonial-text">&ldquo;{review.review}&rdquo;</blockquote>
              <div className="testimonial-author">
                {review.photo && <img src={review.photo} alt={review.name} className="testimonial-avatar" />}
                <div>
                  <p className="testimonial-name">{review.name}</p>
                  <p className="testimonial-role">{review.role}</p>
                </div>
              </div>
            </article>
          </div>

          <button type="button" onClick={goNext} className="testimonials-nav-btn" aria-label="Next">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {reviews.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`testimonials-dot ${i === activeIndex ? 'testimonials-dot-active' : ''}`}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
