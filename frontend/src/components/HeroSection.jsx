import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import { SITE } from '../config/site';

const BEANS = [
  { left: '8%', top: '15%', delay: '0s', size: 18 },
  { left: '85%', top: '20%', delay: '1.2s', size: 14 },
  { left: '72%', top: '70%', delay: '0.6s', size: 16 },
  { left: '15%', top: '75%', delay: '1.8s', size: 12 },
  { left: '50%', top: '10%', delay: '2.4s', size: 10 },
  { left: '92%', top: '55%', delay: '0.3s', size: 13 },
  { left: '5%', top: '45%', delay: '1.5s', size: 15 },
];

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Warm coffee gradient background */}
      <div className="hero-gradient" />
      <div className="hero-glow" />

      {/* Floating coffee beans */}
      <div className="hero-beans" aria-hidden="true">
        {BEANS.map((bean, i) => (
          <span
            key={i}
            className="hero-bean"
            style={{
              left: bean.left,
              top: bean.top,
              width: bean.size,
              height: bean.size * 1.6,
              animationDelay: bean.delay,
            }}
          />
        ))}
      </div>

      <div className="hero-grid mx-auto max-w-7xl px-4 pb-16 pt-28 md:px-8 md:pt-32">
        {/* Left — heading, text, buttons */}
        <div className="hero-content">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.35em] text-gold"
          >
            {SITE.name}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-heading"
          >
            Sweet Melodies,
            <br />
            <span className="text-gold">Bold Brews</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-subtext"
          >
            your city&apos;s artisan café — where chai, coffee, and conversation feel like home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/menu">
              <Button variant="gold">
                Explore Menu <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/reservations">
              <Button
                variant="secondary"
                className="!border-cream/40 !text-cream hover:!border-gold hover:!bg-gold/10"
              >
                Book a Table
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right — premium coffee image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-image-wrap"
        >
          <div className="hero-image-ring" />
          <img
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
            alt="Premium coffee at Brew & Bloom"
            className="hero-image"
          />
          <div className="hero-image-badge">
            <span className="text-xs uppercase tracking-widest text-gold">Single Origin</span>
            <span className="font-display text-lg text-cream">Freshly Roasted</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
