/**
 * SITE CONFIG — edit this ONE file to change brand text across the whole app.
 * Beginner tip: Navbar, Footer, Contact page all read from here.
 */

export const SITE = {
  name: 'Brew & Bloom',
  tagline: 'Coffee · Fresh Food · Good Moments',
  shortStory:
    'A welcoming neighborhood café for specialty coffee, fresh bakes, seasonal plates, and memorable moments.',
  address: 'Add your business address here',
  phone: 'Add your phone number',
  phoneLink: '',
  email: 'hello@example.com',
};

/** Opening hours — shown in Footer, Contact, Announcement bar */
export const HOURS = [
  { days: 'Mon – Fri', time: '8:00 AM – 11:00 PM' },
  { days: 'Saturday', time: '8:00 AM – 12:00 AM' },
  { days: 'Sunday', time: '8:00 AM – 8:00 PM' },
];

/** Main menu links — same list for Navbar + Footer */
export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];
