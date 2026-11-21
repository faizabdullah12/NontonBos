export default function GenreChips({ options, value, onChange, allLabel = 'Semua' }) {
  const chip = (active) =>
    `whitespace-nowrap rounded-full px-space-md py-1.5 text-label-md transition border ${
      active ? 'border-transparent bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/30'
             : 'border-white/10 bg-surface-container/80 text-on-surface-variant hover:text-on-surface'}`;
  return (
    <div className="flex gap-space-sm overflow-x-auto pb-1" role="group" aria-label="Filter genre">
      <button className={chip(!value)} onClick={() => onChange('')}>{allLabel}</button>
      {options.map((g) => (
        <button key={g} className={chip(value === g)} onClick={() => onChange(g)}>{g}</button>
      ))}
    </div>
  );
}
