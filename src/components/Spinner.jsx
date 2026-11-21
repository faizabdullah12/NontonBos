export default function Spinner({ label = 'Memuat data…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-space-md py-20 text-on-surface-variant" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-outline-variant border-t-primary" />
      <span className="text-body-sm">{label}</span>
    </div>
  );
}
