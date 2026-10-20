import PageHero from './PageHero';

/**
 * PAGE LAYOUT — wraps inner pages (About, Menu, Contact, etc.)
 *
 * Shows a hero banner at top, then your content below.
 *
 * Example:
 * <PageLayout title="Menu" subtitle="Café & Hospitality">
 *   <p>Your content here</p>
 * </PageLayout>
 */
export default function PageLayout({
  subtitle,
  title,
  description,
  image,
  wide = false,
  children,
}) {
  return (
    <div className="page-layout">
      <PageHero subtitle={subtitle} title={title} description={description} image={image} />
      <div className={wide ? 'page-content-wide' : 'page-content'}>
        {children}
      </div>
    </div>
  );
}
