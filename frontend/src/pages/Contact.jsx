import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import { getContactItems } from '../api/content';

const TYPE_ICONS = {
  visit: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
  custom: MapPin,
};

/** Contact page — loads from Admin → Contact */
export default function Contact() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getContactItems().then(setItems).catch(() => setItems([]));
  }, []);

  const cards = items.filter((i) => i.type !== 'hours');
  const hours = items.filter((i) => i.type === 'hours');

  return (
    <PageLayout
      subtitle="Get in Touch"
      title="Contact Us"
      description="We'd love to hear from you — visit, call, or drop us a message."
      image="/images/table-preview.png"
    >
      <div className="inner-card-grid">
        {cards.map((item) => {
          const Icon = TYPE_ICONS[item.type] || MapPin;
          const isLink = item.type === 'phone' || item.type === 'email';
          const href = item.type === 'phone' ? `tel:${item.content.replace(/\s/g, '')}` : `mailto:${item.content}`;

          return (
            <div key={item.id} className="contact-card">
              <div className="inner-icon-wrap shrink-0">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-lg text-espresso">{item.title}</h3>
                {isLink ? (
                  <a href={href} className="mt-2 inline-block text-sm text-gold hover:underline">{item.content}</a>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-espresso/60">{item.content}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {hours.length > 0 && (
        <div className="inner-card mt-8">
          <div className="flex items-center gap-3">
            <div className="inner-icon-wrap">
              <Clock className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-xl text-espresso">Opening Hours</h3>
          </div>
          <ul className="mt-6 space-y-3">
            {hours.map((row) => (
              <li key={row.id} className="flex justify-between border-b border-espresso/5 pb-3 text-sm last:border-0">
                <span className="font-medium text-espresso">{row.title}</span>
                <span className="text-espresso/55">{row.content}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </PageLayout>
  );
}
