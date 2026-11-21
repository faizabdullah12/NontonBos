export default function ErrorMessage({ message, onRetry }) {
  return (
    <div role="alert" className="mx-auto flex max-w-lg flex-col items-center gap-space-md rounded-xl border border-error/30 bg-error-container/20 p-space-xl text-center">
      <span className="material-symbols-outlined text-[40px] text-error">error</span>
      <div>
        <h3 className="text-headline-sm text-on-error-container">Gagal memuat data</h3>
        <p className="mt-1 text-body-md text-on-surface-variant">{message}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="rounded-lg bg-primary px-space-lg py-space-sm text-label-lg font-bold text-on-primary hover:bg-primary-fixed">
          Coba Lagi
        </button>
      )}
    </div>
  );
}
