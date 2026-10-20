import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Heart, Cake } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import { getCafeEvents } from '../api/content';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const ICONS = { music: Music, heart: Heart, cake: Cake };

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getCafeEvents().then(setEvents).catch(() => setEvents([]));
  }, []);

  return (
    <PageLayout
      subtitle="Gather & Celebrate"
      title="Events"
      description="Live music, private dinners, and birthday celebrations at Brew & Bloom."
      image="/images/experience/special-events.png"
      wide
    >
      <div className="inner-card-grid">
        {events.map((event, i) => {
          const Icon = ICONS[event.icon] || Music;
          return (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="inner-card overflow-hidden !p-0"
            >
              {event.image && (
                <div className="h-48 overflow-hidden">
                  <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <div className="inner-icon-wrap !h-10 !w-10">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <p className="mt-4 text-xs uppercase tracking-widest text-gold">{event.schedule}</p>
                <h3 className="mt-2 font-display text-2xl text-espresso">{event.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso/60">{event.description}</p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link to="/reservations">
          <Button variant="gold">Reserve for an Event</Button>
        </Link>
      </div>
    </PageLayout>
  );
}
