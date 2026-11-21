export default function EmptyState({ icon = 'search_off', title, message, action }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-space-md py-16 text-center">
      <span className="material-symbols-outlined text-[56px] text-outline">{icon}</span>
      <h3 className="text-headline-sm">{title}</h3>
      {message && <p className="text-body-md text-on-surface-variant">{message}</p>}
      {action}
    </div>
  );
}
