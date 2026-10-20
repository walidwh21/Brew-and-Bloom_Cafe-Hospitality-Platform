/** Simple card wrapper — just a styled div */
export default function Card({ children, className = '' }) {
  return <div className={`card-luxury ${className}`}>{children}</div>;
}
