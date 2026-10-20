/**
 * EVENTS SECTION (homepage)
 * Loads events from Admin → Events
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Music, Heart, Cake } from 'lucide-react';
import Button from './ui/Button';
import { getCafeEvents } from '../api/content';

function getEventIcon(iconName) {
  if (iconName === 'heart') return Heart;
  if (iconName === 'cake') return Cake;
  return Music;
}

export default function EventsSection() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCafeEvents();
        setEvents(data);
      } catch {
        setEvents([]);
      }
    }
    load();
  }, []);

  return (
    <section className="events-section">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="text-center">
          <p className="section-subtitle">Gather & Celebrate</p>
          <h2 className="section-title">Events</h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {events.map((event) => {
            const Icon = getEventIcon(event.icon);
            return (
              <article key={event.id} className="event-card group">
                <div className="event-card-image-wrap">
                  {event.image && <img src={event.image} alt={event.title} className="event-card-image" />}
                  <div className="event-card-icon"><Icon className="h-5 w-5 text-gold" strokeWidth={1.5} /></div>
                </div>
                <div className="event-card-body">
                  <p className="event-card-schedule">{event.schedule}</p>
                  <h3 className="event-card-title">{event.title}</h3>
                  <p className="event-card-desc">{event.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        {events.length > 0 && (
          <div className="mt-12 text-center">
            <Link to="/reservations"><Button variant="gold">Book an Event</Button></Link>
          </div>
        )}
      </div>
    </section>
  );
}
