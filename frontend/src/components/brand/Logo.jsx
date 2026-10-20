/**
 * BRAND LOGO — coffee cup with "Brew & Bloom" on the cup
 * Uses inline SVG (not an image file) so the logo always appears.
 */
import { Link } from 'react-router-dom';
import { SITE } from '../../config/site';
import LogoMark from './LogoMark';

export default function Logo({
  size = 'md',
  link = true,
  className = '',
}) {
  const heights = {
    sm: 'h-14 w-auto',
    md: 'h-16 w-auto md:h-[4.5rem]',
    lg: 'h-20 w-auto md:h-24',
    header: 'h-[4.5rem] w-auto sm:h-20 md:h-[5.25rem]',
  };

  const content = (
    <span className={`brand-logo inline-flex shrink-0 items-center ${className}`}>
      <LogoMark className={heights[size] || heights.md} />
    </span>
  );

  if (link) {
    return (
      <Link to="/" className="brand-logo-link shrink-0" aria-label={`${SITE.name} home`}>
        {content}
      </Link>
    );
  }

  return content;
}
