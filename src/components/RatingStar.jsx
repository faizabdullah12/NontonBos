import { formatRating } from '../utils/format.js';

export default function RatingStar({ value, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 font-bold tabular-nums text-on-surface ${className}`}>
      <span className="material-symbols-outlined icon-fill text-[16px] text-amber-400">star</span>
      {formatRating(value)}
    </span>
  );
}
