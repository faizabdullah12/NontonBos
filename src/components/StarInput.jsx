export default function StarInput({ value, onChange, label = 'Rating' }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} bintang`}
          onClick={() => onChange(value === n ? 0 : n)}
          className="p-0.5 transition hover:scale-110"
        >
          <span className={`material-symbols-outlined text-[22px] ${n <= value ? 'icon-fill text-amber-400' : 'text-outline-variant'}`}>star</span>
        </button>
      ))}
    </div>
  );
}
