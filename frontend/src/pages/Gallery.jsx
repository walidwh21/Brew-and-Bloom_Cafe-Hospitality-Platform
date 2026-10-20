import PageLayout from '../components/layout/PageLayout';
import GalleryGrid from '../components/GalleryGrid';

export default function Gallery() {
  return (
    <PageLayout
      subtitle="Visual Journey"
      title="Gallery"
      description="Coffee art, cosy interiors, seasonal dishes, and festive evenings."
      image="/images/experience/special-events.png"
      wide
    >
      <GalleryGrid />
    </PageLayout>
  );
}
