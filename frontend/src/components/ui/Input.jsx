export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-espresso/80">{label}</label>
      )}
      <input className="input-luxury" {...props} />
      {error && <p className="mt-1 text-sm text-burgundy">{error}</p>}
    </div>
  );
}
