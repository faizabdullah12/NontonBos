export default function SelectField({ label, value, onChange, options, className = '' }) {
  return (
    <label className={`flex items-center gap-space-sm text-body-sm text-on-surface-variant ${className}`}>
      <span className="hidden sm:inline">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-white/10 bg-surface-container-high px-space-sm py-1.5 text-label-md font-bold text-on-surface outline-none focus:border-[#6366F1]">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}
