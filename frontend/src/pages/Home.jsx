/**
 * HOME PAGE — lists sections in order
 *
 * Each section is a separate file in components/
 * Only SignatureBrews loads data here; other sections load their own data.
 */
import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import SignatureBrews from '../components/SignatureBrews';
import AboutSection from '../components/AboutSection';
import MenuPreviewSection from '../components/MenuPreviewSection';
import ReservationSection from '../components/ReservationSection';
import SpecialOffersSection from '../components/SpecialOffersSection';
import TestimonialsSection from '../components/TestimonialsSection';
import MembershipSection from '../components/MembershipSection';
import ExperienceSection from '../components/ExperienceSection';
import GallerySection from '../components/GallerySection';
import EventsSection from '../components/EventsSection';
import NewsletterSection from '../components/NewsletterSection';
import { getProducts } from '../api/menu';

export default function Home() {
  const [signatureBrews, setSignatureBrews] = useState([]);

  // Load featured products when page opens
  useEffect(() => {
    async function loadFeatured() {
      const products = await getProducts({ available_only: true, featured: true });
      setSignatureBrews(products.slice(0, 4));
    }
    loadFeatured();
  }, []);

  return (
    <div className="home-page">
      <HeroSection />
      <SignatureBrews products={signatureBrews} />
      <AboutSection />
      <MenuPreviewSection />
      <ReservationSection />
      <SpecialOffersSection />
      <TestimonialsSection />
      <MembershipSection />
      <ExperienceSection />
      <GallerySection />
      <EventsSection />
      <NewsletterSection />
    </div>
  );
}
