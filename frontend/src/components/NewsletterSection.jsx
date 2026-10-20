import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import Button from './ui/Button';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Mail className="mx-auto h-7 w-7 text-gold" strokeWidth={1.5} />
          <p className="section-subtitle mt-4">Newsletter</p>
          <h2 className="mt-2 font-display text-3xl font-light text-espresso md:text-4xl">
            Stay in the Loop
          </h2>
          <p className="mx-auto mt-4 max-w-md text-espresso/55">
            Stay updated with our latest brews and melodies.
          </p>
        </motion.div>

        {submitted ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 text-sm text-sage"
          >
            Thank you for subscribing. We will keep you posted on new brews and events.
          </motion.p>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="newsletter-form mt-10"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="newsletter-input"
              aria-label="Email address"
            />
            <Button type="submit" variant="gold" className="newsletter-btn shrink-0">
              Subscribe
            </Button>
          </motion.form>
        )}

        {error && <p className="mt-3 text-sm text-burgundy">{error}</p>}
      </div>
    </section>
  );
}
