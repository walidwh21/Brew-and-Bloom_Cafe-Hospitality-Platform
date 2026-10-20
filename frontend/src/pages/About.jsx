/**
 * ABOUT PAGE — full story page
 * Loads page slug "our-story" (or "about" as fallback) from admin
 */
import { useEffect, useState } from 'react';
import { Heart, Coffee, Leaf } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import { getPage, getStoryPillars } from '../api/content';

const PILLAR_ICONS = [Heart, Coffee, Leaf];

export default function About() {
  const [page, setPage] = useState(null);
  const [pillars, setPillars] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const pageData = await getPage('our-story');
        setPage(pageData);
      } catch {
        try {
          const fallback = await getPage('about');
          setPage(fallback);
        } catch {
          setPage(null);
        }
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

  if (!page) {
    return (
      <PageLayout subtitle="Our Story" title="About Brew & Bloom" description="Loading...">
        <p className="text-espresso/50">Loading content...</p>
      </PageLayout>
    );
  }

  // Split body text into paragraphs (split on blank line)
  const paragraphs = (page.body || '').split('\n\n').filter((p) => p.trim() !== '');

  return (
    <PageLayout
      subtitle={page.subtitle || 'Our Story'}
      title={page.title}
      description={page.lead}
      image={page.image_1}
    >
      <div className="inner-prose">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 30)}>{p}</p>
        ))}
      </div>

      <div className="inner-card-grid mt-12">
        {pillars.map((item, i) => {
          const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
          return (
            <div key={item.id} className="inner-card">
              <div className="inner-icon-wrap">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-display text-xl text-espresso">{item.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-espresso/55">{item.text}</p>
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}
