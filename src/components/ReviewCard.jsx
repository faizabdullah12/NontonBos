import { Link } from 'react-router-dom';
import Badge from './Badge.jsx';
import { formatDate } from '../utils/format.js';

export default function ReviewCard({ review, onDelete }) {
  return (
    <article className="glass flex flex-col gap-space-sm rounded-xl p-space-lg">
      <div className="flex items-start justify-between gap-space-sm">
        <div>
          <Link to={`/jelajah/${review.showId}`} className="text-headline-sm hover:text-primary">{review.showName}</Link>
          <p className="text-body-sm text-outline">oleh {review.author} · {formatDate(review.createdAt)}</p>
        </div>
        <button onClick={() => onDelete(review.id)} aria-label="Hapus review" className="grid h-9 w-9 place-items-center rounded-full text-outline hover:bg-error-container/30 hover:text-error">
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>
      <div className="flex items-center gap-1" aria-label={`${review.rating} dari 5`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`material-symbols-outlined text-[18px] ${n <= review.rating ? 'icon-fill text-amber-400' : 'text-outline-variant'}`}>star</span>
        ))}
        {review.spoiler && <Badge tone="crimson" className="ml-2">Spoiler</Badge>}
      </div>
      <p className="text-body-md text-on-surface-variant">{review.text}</p>
    </article>
  );
}
