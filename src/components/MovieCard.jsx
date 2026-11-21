import { Link } from 'react-router-dom';
import Badge from './Badge.jsx';
import Poster from './Poster.jsx';
import RatingStar from './RatingStar.jsx';
import { useWatchlist } from '../context/WatchlistContext.jsx';
import { formatRuntime, statusLabel } from '../utils/format.js';

export default function MovieCard({ show }) {
  const { has, toggle } = useWatchlist();
  const saved = has(show.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-surface-container-low ring-1 ring-white/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-8px_rgba(99,102,241,0.35)] hover:ring-[#6366F1]/60">
      <Link to={`/jelajah/${show.id}`} className="relative block aspect-[2/3] overflow-hidden">
        <Poster src={show.image} alt={`Poster ${show.name}`} className="h-full w-full transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,15,23,0.95)] via-[rgba(11,15,23,0.35)] to-transparent" />
        <div className="absolute left-space-sm top-space-sm">
          {show.status === 'Running' && <Badge tone="crimson">Tayang</Badge>}
        </div>
        <div className="absolute bottom-space-sm left-space-sm flex flex-wrap gap-1">
          {show.genres.slice(0, 2).map((g) => <Badge key={g} tone="cyan">{g}</Badge>)}
        </div>
      </Link>

      <button onClick={() => toggle(show)} aria-pressed={saved}
        aria-label={saved ? `Hapus ${show.name} dari watchlist` : `Tambah ${show.name} ke watchlist`}
        className="absolute right-space-sm top-space-sm grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-surface-container-lowest/70 backdrop-blur transition hover:bg-surface-container-high">
        <span className={`material-symbols-outlined text-[20px] ${saved ? 'icon-fill text-secondary' : 'text-on-surface'}`}>bookmark</span>
      </button>

      <div className="flex flex-1 flex-col gap-1 p-space-md">
        <div className="flex items-center justify-between text-body-sm tabular-nums text-on-surface-variant">
          <span>{show.year ?? '—'} • {formatRuntime(show.runtime)}</span>
          <RatingStar value={show.rating} className="text-body-sm" />
        </div>
        <h3 className="line-clamp-1 text-headline-sm">{show.name}</h3>
        <p className="line-clamp-2 text-body-sm text-on-surface-variant">{show.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-space-sm text-label-badge uppercase text-outline">
          <span>{statusLabel(show.status)}</span>
          <Link to={`/jelajah/${show.id}`} className="flex items-center gap-0.5 text-primary hover:text-primary-fixed">
            Detail <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
