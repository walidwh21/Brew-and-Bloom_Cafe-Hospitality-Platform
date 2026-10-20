import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import PageLayout from '../components/layout/PageLayout';
import { createReservation } from '../api/reservations';
import { useAuth } from '../context/AuthContext';
import { SITE } from '../config/site';

export default function Reservations() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    guests: 2,
    reservation_date: '',
    reservation_time: '18:00',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createReservation(form);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Reservation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <PageLayout subtitle="Confirmed" title="Table Reserved" image="/images/reservation-bg.png">
        <div className="inner-card mx-auto max-w-lg text-center">
          <CalendarCheck className="mx-auto h-14 w-14 text-gold" strokeWidth={1.5} />
          <h2 className="mt-6 font-display text-3xl text-espresso">We Look Forward to Welcoming You</h2>
          <p className="mt-4 text-espresso/60">Our team will confirm your reservation shortly.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      subtitle="Reserve"
      title="Book a Table"
      description="Chai, coffee, brunch, or celebrations — reserve your spot at our café."
      image="/images/reservation-bg.png"
    >
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="inner-card lg:col-span-2">
          <h3 className="font-display text-xl text-espresso">Visit Details</h3>
          <ul className="mt-6 space-y-4 text-sm text-espresso/60">
            <li><strong className="text-espresso">Location:</strong><br />{SITE.address}</li>
            <li><strong className="text-espresso">Phone:</strong><br />
              <a href={SITE.phoneLink} className="text-gold hover:underline">{SITE.phone}</a>
            </li>
            <li><strong className="text-espresso">Tip:</strong> Book 24 hours ahead for weekends and events.</li>
          </ul>
          <img
            src="/images/table-preview.png"
            alt="Table at Brew & Bloom"
            className="mt-6 w-full rounded-xl object-cover shadow-md"
          />
        </div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleSubmit}
          className="inner-card space-y-4 lg:col-span-3"
        >
          <h3 className="font-display text-xl text-espresso">Reservation Form</h3>

          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="Guests" type="number" min={1} max={20} value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} required />
            <Input label="Date" type="date" value={form.reservation_date} onChange={(e) => setForm({ ...form, reservation_date: e.target.value })} required />
            <Input label="Time" type="time" value={form.reservation_time} onChange={(e) => setForm({ ...form, reservation_time: e.target.value })} required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-espresso/80">Special Requests</label>
            <textarea
              className="input-luxury"
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Occasion, dietary needs, seating preference..."
            />
          </div>

          {error && <p className="text-sm text-burgundy">{error}</p>}

          <Button type="submit" variant="gold" className="w-full" loading={loading}>
            Request Reservation
          </Button>
        </motion.form>
      </div>
    </PageLayout>
  );
}
