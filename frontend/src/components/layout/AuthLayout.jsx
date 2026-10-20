/**
 * AUTH LAYOUT — split screen for Login and Register
 * Left = café photo, Right = form
 */
import Logo from '../brand/Logo';
export default function AuthLayout({ subtitle, title, hint, children }) {
  return (
    <div className="auth-layout">
      <div className="auth-layout-visual">
        <img
          src="/images/experience/cozy-interiors.png"
          alt="Brew & Bloom café interior"
          className="auth-layout-image"
        />
        <div className="auth-layout-visual-overlay" />
        <div className="auth-layout-visual-text">
          <Logo size="lg" link className="items-start" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/55">
            Sweet melodies, bold brews — your city&apos;s favourite neighbourhood café.
          </p>
        </div>
      </div>

      <div className="auth-layout-form-wrap">
        <div className="auth-layout-card">
          <div className="text-center">
            <p className="section-subtitle !mt-0">{subtitle}</p>
            <h1 className="font-display text-3xl text-espresso">{title}</h1>
            {hint && <p className="mt-2 text-sm text-espresso/55">{hint}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
