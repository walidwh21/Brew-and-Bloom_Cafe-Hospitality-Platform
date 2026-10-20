/**
 * BUTTON — reusable button with 3 styles: primary, secondary, gold
 *
 * Usage: <Button variant="gold" onClick={...}>Click me</Button>
 */
export default function Button({
  children,
  variant = 'primary',
  className = '',
  loading = false,
  ...props
}) {
  let styleClass = 'btn-primary';
  if (variant === 'secondary') styleClass = 'btn-secondary';
  if (variant === 'gold') styleClass = 'btn-gold';

  return (
    <button
      className={`${styleClass} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        children
      )}
    </button>
  );
}
