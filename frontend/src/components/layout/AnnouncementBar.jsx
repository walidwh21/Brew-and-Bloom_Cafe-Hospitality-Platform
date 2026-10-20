import { Link } from 'react-router-dom';
import { Coffee, Clock, Phone } from 'lucide-react';
import { SITE, HOURS } from '../../config/site';

/** Top bar — edit items here or in config/site.js */
const announcements = [
  { icon: Coffee, text: 'Fresh chai & coffee daily' },
  { icon: Clock, text: `Open ${HOURS[0].time}` },
  { icon: Phone, text: SITE.phone, href: SITE.phoneLink },
];

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="announcement-bar-inner">
        {announcements.map((item, index) => {
          const Icon = item.icon;
          const content = (
            <span className="announcement-item">
              <Icon className="h-3 w-3 shrink-0" strokeWidth={1.5} />
              {item.text}
            </span>
          );

          return (
            <span key={item.text} className="flex items-center gap-6">
              {index > 0 && <span className="announcement-divider" aria-hidden="true">|</span>}
              {item.href ? (
                <a href={item.href} className="announcement-link">{content}</a>
              ) : (
                content
              )}
            </span>
          );
        })}

        <span className="announcement-divider hidden sm:inline" aria-hidden="true">|</span>
        <Link to="/reservations" className="announcement-link hidden sm:inline">
          Book a table
        </Link>
      </div>
    </div>
  );
}
