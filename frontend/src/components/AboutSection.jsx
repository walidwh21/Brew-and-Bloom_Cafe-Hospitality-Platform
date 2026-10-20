/**
 * ABOUT SECTION (homepage)
 *
 * Loads two things from database:
 * 1. Page with slug "about" → title, images, lead text
 * 2. Story pillars → the 3 text blocks
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getPage, getStoryPillars } from '../api/content';

export default function AboutSection() {
  const [page, setPage] = useState(null);
  const [pillars, setPillars] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const pageData = await getPage('about');
        setPage(pageData);
      } catch {
        setPage(null);
      }
      try {
        const pillarData = await getStoryPillars();
        setPillars(pillarData);
      } catch {
        setPillars([]);
      }
    }
    load();
  }, []);

  if (!page) return null;

  const collageClasses = ['about-collage-main', 'about-collage-secondary', 'about-collage-accent'];
  const images = [];
  if (page.image_1) images.push(page.image_1);
  if (page.image_2) images.push(page.image_2);
  if (page.image_3) images.push(page.image_3);

  return (
    <section className="about-section">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32 lg:py-40">
        <div className="about-grid">
          <div className="about-collage">
            {images.map((src, i) => (
              <div key={src} className={collageClasses[i] || 'about-collage-accent'}>
                <img src={src} alt="" className="about-collage-img" />
              </div>
            ))}
          </div>

          <div className="about-content">
            <p className="section-subtitle !mt-0">{page.subtitle || 'Our Story'}</p>
            <h2 className="about-title">{page.title}</h2>
            <p className="about-lead">{page.lead}</p>

            <div className="about-pillars">
              {pillars.map((pillar) => (
                <div key={pillar.id} className="about-pillar">
                  <h3 className="about-pillar-label">{pillar.label}</h3>
                  <p className="about-pillar-text">{pillar.text}</p>
                </div>
              ))}
            </div>

            <Link to="/about" className="about-link group">
              Read our full story
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
