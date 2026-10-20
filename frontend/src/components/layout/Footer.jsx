import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { SITE, HOURS, NAV_LINKS } from '../../config/site';
import Logo from '../brand/Logo';

const SOCIAL_ICONS = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M13.5 8.5H16V5h-2.5C11.57 5 10 6.79 10 9.25V11H7v3.5h3V21h3.5v-6.5H17V11h-3.5V9.75c0-.97.78-1.25 1.5-1.25z" />
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.244 3H21.5l-7.5 8.57L22 21h-6.59l-5.16-6.73L4.5 21H1.24l8.04-9.18L2 3h6.75l4.66 6.17L18.244 3zm-2.3 16.2h1.77L7.06 4.67H5.18l10.766 14.533z" />
    </svg>
  ),
  YouTube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.12 5 12 5 12 5s-6.12 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.88 19 12 19 12 19s6.12 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  ),
};

const SOCIAL_LINKS = [
  { href: 'https://instagram.com', label: 'Instagram', icon: 'Instagram' },
  { href: 'https://facebook.com', label: 'Facebook', icon: 'Facebook' },
  { href: 'https://twitter.com', label: 'Twitter', icon: 'Twitter' },
  { href: 'https://youtube.com', label: 'YouTube', icon: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="footer-grid">
          <div className="footer-col">
            <Logo size="lg" className="items-start" />
            <p className="footer-story">{SITE.shortStory}</p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Opening Hours</h4>
            <ul className="footer-hours">
              {HOURS.map((row) => (
                <li key={row.days} className="footer-hours-row">
                  <span className="text-cream/80">{row.days}</span>
                  <span className="text-cream/55">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-contact">
              <li>
                <MapPin className="h-4 w-4 shrink-0 text-gold" />
                <span>{SITE.address}</span>
              </li>
              <li>
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href={SITE.phoneLink} className="footer-link">{SITE.phone}</a>
              </li>
              <li>
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${SITE.email}`} className="footer-link">{SITE.email}</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Follow Us</h4>
            <p className="mb-4 text-sm text-cream/55">Brews, melodies, and your city moments.</p>
            <div className="footer-social">
              {SOCIAL_LINKS.map(({ href, label, icon }) => {
                const Icon = SOCIAL_ICONS[icon];
                return (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="footer-social-btn">
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved. Made for good moments.</p>
      </div>
    </footer>
  );
}
