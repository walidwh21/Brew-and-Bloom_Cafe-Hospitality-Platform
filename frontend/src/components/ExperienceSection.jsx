import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const EXPERIENCES = [
  {
    title: 'Cozy Interiors',
    description: 'Warm seating, local art, and the cosy charm of a neighbourhood your city café.',
    image: '/images/experience/cozy-interiors.png',
    link: '/gallery',
  },
  {
    title: 'Live Music',
    description: 'Acoustic evenings and jazz brunch under crystal light.',
    image: '/images/experience/live-music.png',
    link: '/events',
  },
  {
    title: 'Private Dining',
    description: 'Intimate tables for celebrations and quiet conversations.',
    image: '/images/experience/private-dining.png',
    link: '/reservations',
  },
  {
    title: 'Special Events',
    description: 'Seasonal tastings, workshops, and curated gatherings.',
    image: '/images/experience/special-events.png',
    link: '/events',
  },
];

function ExperienceCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={item.link} className="experience-card group">
        <img src={item.image} alt={item.title} className="experience-card-image" />
        <div className="experience-card-overlay" />
        <div className="experience-card-content">
          <h3 className="experience-card-title">{item.title}</h3>
          <p className="experience-card-desc">{item.description}</p>
          <span className="experience-card-link">
            Discover
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <section className="experience-section">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="section-subtitle">Beyond the Cup</p>
          <h2 className="section-title">Experience More Than Coffee</h2>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-espresso/55 md:text-lg">
            A destination for ambiance, artistry, and unforgettable moments.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {EXPERIENCES.map((item, i) => (
            <ExperienceCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
