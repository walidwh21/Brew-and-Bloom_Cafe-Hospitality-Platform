import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Sparkles, CalendarCheck, Mail, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createReservation } from '../api/reservations';
import { useAuth } from '../context/AuthContext';
import { SITE } from '../config/site';
import Button from './ui/Button';

const OCCASIONS = [
  'Casual Dining',
  'Birthday Celebration',
  'Anniversary',
  'Business Meeting',
  'Date Night',
  'Special Event',
];

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

function DarkField({ label, icon: Icon, children }) {
  return (
    <div className="reservation-field">
      <label className="reservation-label">{label}</label>
      <div className="reservation-input-wrap">
        <Icon className="reservation-input-icon" strokeWidth={1.5} />
        {children}
      </div>
    </div>
  );
}

export default function ReservationSection() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    guests: 2,
    reservation_date: '',
    reservation_time: '19:00',
    occasion: 'Casual Dining',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const needsContact = !user || !user.phone;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const name = form.name || user?.name;
    const email = form.email || user?.email;
    const phone = form.phone || user?.phone;

    if (!name || !email || !phone) {
      setError('Please provide your name, email, and phone.');
      setLoading(false);
      return;
    }

    try {
      await createReservation({
        name,
        email,
        phone,
        guests: Number(form.guests),
        reservation_date: form.reservation_date,
        reservation_time: form.reservation_time,
        notes: `Occasion: ${form.occasion}`,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="reservation-section">
      <div className="reservation-bg" />
      <div className="reservation-overlay" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <CalendarCheck className="mx-auto h-8 w-8 text-gold" strokeWidth={1.5} />
          <p className="section-subtitle mt-4 !text-gold">Reservation</p>
          <h2 className="mt-3 font-display text-4xl font-light tracking-wide text-cream md:text-5xl">
            Book Your Table
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm font-light tracking-[0.15em] text-cream/60 uppercase">
            {SITE.address}
          </p>
        </motion.div>

        <div className="reservation-grid mt-14">
          {/* Table preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="reservation-preview"
          >
            <div className="reservation-preview-frame">
              <img
                src="/images/table-preview.png"
                alt="Elegant table setting at Brew & Bloom"
                className="reservation-preview-image"
              />
              <div className="reservation-preview-caption">
                <span className="text-xs uppercase tracking-[0.3em] text-gold">Preview</span>
                <p className="mt-1 font-display text-2xl text-cream">Your Table Awaits</p>
              </div>
            </div>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="reservation-card"
          >
            {success ? (
              <div className="py-8 text-center">
                <CalendarCheck className="mx-auto h-12 w-12 text-gold" />
                <h3 className="mt-6 font-display text-3xl text-cream">Reservation Received</h3>
                <p className="mt-4 text-sm leading-relaxed text-cream/60">
                  We look forward to welcoming you. Our team will confirm shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-8 text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light"
                >
                  Book another table
                </button>
              </div>
            ) : (
              <>
                <h3 className="reservation-card-title">Reserve Your Experience</h3>
                <p className="reservation-card-sub">
                  Or call us at{' '}
                  <a href={SITE.phoneLink} className="text-gold hover:text-gold-light">
                    {SITE.phone}
                  </a>
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {needsContact && (
                    <div className="grid gap-4 sm:grid-cols-3">
                      {!user && (
                        <>
                          <DarkField label="Name" icon={User}>
                            <input
                              type="text"
                              className="reservation-input"
                              placeholder="Your name"
                              value={form.name}
                              onChange={(e) => update('name', e.target.value)}
                              required
                            />
                          </DarkField>
                          <DarkField label="Email" icon={Mail}>
                            <input
                              type="email"
                              className="reservation-input"
                              placeholder="Email address"
                              value={form.email}
                              onChange={(e) => update('email', e.target.value)}
                              required
                            />
                          </DarkField>
                        </>
                      )}
                      <DarkField label="Phone" icon={Phone}>
                        <input
                          type="tel"
                          className="reservation-input"
                          placeholder="Phone number"
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          required
                        />
                      </DarkField>
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <DarkField label="Date" icon={Calendar}>
                      <input
                        type="date"
                        className="reservation-input"
                        value={form.reservation_date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => update('reservation_date', e.target.value)}
                        required
                      />
                    </DarkField>

                    <DarkField label="Time" icon={Clock}>
                      <input
                        type="time"
                        className="reservation-input"
                        value={form.reservation_time}
                        onChange={(e) => update('reservation_time', e.target.value)}
                        required
                      />
                    </DarkField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <DarkField label="Guests" icon={Users}>
                      <select
                        className="reservation-input reservation-select"
                        value={form.guests}
                        onChange={(e) => update('guests', e.target.value)}
                        required
                      >
                        {GUEST_OPTIONS.map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </DarkField>

                    <DarkField label="Occasion" icon={Sparkles}>
                      <select
                        className="reservation-input reservation-select"
                        value={form.occasion}
                        onChange={(e) => update('occasion', e.target.value)}
                        required
                      >
                        {OCCASIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </DarkField>
                  </div>

                  {error && <p className="text-sm text-rose">{error}</p>}

                  <Button type="submit" variant="gold" className="w-full !py-4 !text-sm !tracking-[0.2em]" loading={loading}>
                    Reserve Now
                  </Button>

                  <p className="text-center text-xs text-cream/40">
                    Need a larger party?{' '}
                    <Link to="/reservations" className="text-gold/80 hover:text-gold">
                      Full reservation form
                    </Link>
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
