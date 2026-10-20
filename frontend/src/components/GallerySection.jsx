import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GalleryGrid from './GalleryGrid';
import Button from './ui/Button';

export default function GallerySection() {
  return (
    <section className="gallery-section">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="section-subtitle">Visual Journey</p>
          <h2 className="section-title">Our Gallery</h2>
          <p className="mx-auto mt-4 max-w-xl text-espresso/55">
            Coffee art, cozy interiors, seasonal dishes, and festive evenings at Brew & Bloom.
          </p>
        </motion.div>

        <div className="mt-10">
          <GalleryGrid animate />
        </div>

        <div className="mt-14 text-center">
          <Link to="/gallery">
            <Button variant="gold">View Full Gallery</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
