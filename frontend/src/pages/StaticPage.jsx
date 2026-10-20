/**
 * Simple static page template for About, Events, Gallery, Contact.
 */
export default function StaticPage({ subtitle, title, children }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <p className="section-subtitle">{subtitle}</p>
      <h1 className="section-title">{title}</h1>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-espresso/75">
        {children}
      </div>
    </div>
  );
}
