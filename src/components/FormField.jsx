// Pembungkus label + pesan error untuk controlled input
export default function FormField({ label, error, hint, htmlFor, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-label-lg text-on-surface">{label}</label>
      {children}
      {error ? (
        <p role="alert" className="flex items-center gap-1 text-body-sm text-error">
          <span className="material-symbols-outlined text-[16px]">error</span>{error}
        </p>
      ) : hint ? <p className="text-body-sm text-outline">{hint}</p> : null}
    </div>
  );
}
