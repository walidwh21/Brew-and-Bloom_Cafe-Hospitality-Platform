/**
 * ADMIN STATUS COMPONENTS
 *
 * Reuse on every admin page for consistent loading & error UI.
 * Pattern: if (loading) return <AdminLoading />; if (error) return <AdminError message={error} />;
 */

export function AdminLoading({ label = 'Loading...' }) {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      <p className="text-sm text-espresso/60">{label}</p>
    </div>
  );
}

export function AdminError({ message, hint }) {
  return (
    <div className="card-luxury text-center">
      <p className="text-burgundy">{message}</p>
      {hint && <p className="mt-2 text-sm text-espresso/60">{hint}</p>}
    </div>
  );
}
