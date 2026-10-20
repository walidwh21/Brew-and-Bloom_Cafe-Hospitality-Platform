/** Coffee cup logo — inline SVG so it always shows (no broken image path) */
export default function LogoMark({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 110 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="55" cy="96" rx="36" ry="4" fill="#000" opacity="0.08" />
      <ellipse cx="55" cy="94" rx="32" ry="3.5" stroke="#d4a373" strokeWidth="2" fill="#faf6f0" />
      <path
        d="M80 36 C94 33 99 48 94 60 C88 70 80 67 80 56"
        stroke="#d4a373"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M24 30 L19 78 C18 85 24 90 55 90 C86 90 92 85 91 78 L86 30 Z"
        fill="#fffaf5"
        stroke="#3b2a21"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <ellipse cx="55" cy="30" rx="31" ry="6" fill="#e8c98a" stroke="#3b2a21" strokeWidth="2" />
      <ellipse cx="55" cy="35" rx="25" ry="5" fill="#4a3228" />
      <path d="M30 36 C32 62 40 74 55 74 C70 74 78 62 80 36" fill="#2c1810" />
      <text
        x="55"
        y="62"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="13"
        fontWeight="700"
        fill="#3b2a21"
        letterSpacing="0.05em"
      >
        BREW
      </text>
      <text
        x="55"
        y="78"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="13"
        fontWeight="700"
        fill="#3b2a21"
        letterSpacing="0.08em"
      >
        BLOOM
      </text>
      <path d="M33 38 L31 76 C30 82 36 83 37 77 L39 40 Z" fill="#fff" opacity="0.35" />
    </svg>
  );
}
