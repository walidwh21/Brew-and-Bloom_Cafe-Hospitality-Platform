/**
 * PAGE HERO — dark banner at top of inner pages
 */
export default function PageHero({ subtitle, title, description, image }) {
  return (
    <section
      className="page-hero"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="page-hero-overlay" />
      <div className="page-hero-glow" aria-hidden="true" />

      <div className="page-hero-content">
        <p className="section-subtitle !mt-0 !text-gold">{subtitle}</p>
        <h1 className="page-hero-title">{title}</h1>
        {description && <p className="page-hero-desc">{description}</p>}
      </div>
    </section>
  );
}
