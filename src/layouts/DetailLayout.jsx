import { Link, Outlet, useParams } from 'react-router-dom';
import Badge from '../components/Badge.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Poster from '../components/Poster.jsx';
import RatingStar from '../components/RatingStar.jsx';
import Spinner from '../components/Spinner.jsx';
import Tabs from '../components/Tabs.jsx';
import { useWatchlist } from '../context/WatchlistContext.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { fetchShow } from '../services/showService.js';
import { formatRuntime, statusLabel } from '../utils/format.js';

// Dynamic route + nested route: /jelajah/:id  (tab: overview, cast, episodes, reviews)
export default function DetailLayout() {
  const { id } = useParams();
  const { data: show, loading, error, reload } = useFetch((s) => fetchShow(id, s), [id]);
  const { has, toggle } = useWatchlist();

  if (loading) return <Spinner label="Memuat detail…" />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const saved = has(show.id);
  const base = `/jelajah/${show.id}`;

  return (
    <div className="flex flex-col gap-space-lg">
      <Link to="/jelajah" className="inline-flex w-fit items-center gap-1 text-label-md text-primary hover:text-on-surface">
        <span className="material-symbols-outlined text-[16px]">arrow_back</span> Kembali ke Jelajah
      </Link>

      <section className="relative overflow-hidden rounded-xl border border-white/5">
        {show.imageLarge && <div className="absolute inset-0 scale-110 bg-cover bg-center opacity-30 blur-2xl" style={{ backgroundImage: `url(${show.imageLarge})` }} />}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-surface/30" />
        <div className="relative grid gap-gutter p-space-lg md:grid-cols-[240px_1fr] md:p-space-xl">
          <Poster src={show.imageLarge || show.image} alt={`Poster ${show.name}`} className="mx-auto aspect-[2/3] w-48 rounded-xl shadow-2xl md:w-full" />
          <div className="flex flex-col gap-space-md">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="inline-flex items-center rounded bg-surface-container-high/90 px-space-sm py-1"><RatingStar value={show.rating} className="text-label-badge" /></span>
              <Badge>{show.year ?? '—'}</Badge>
              <Badge>{formatRuntime(show.runtime)}</Badge>
              <Badge tone={show.status === 'Running' ? 'green' : 'neutral'}>{statusLabel(show.status)}</Badge>
              {show.genres.map((g) => <Badge key={g} tone="cyan">{g}</Badge>)}
            </div>
            <h1 className="text-headline-xl-mobile md:text-display-hero">
              <span className="bg-gradient-to-r from-primary via-tertiary to-tertiary-fixed-dim bg-clip-text text-transparent">{show.name}</span>
            </h1>
            <p className="line-clamp-4 max-w-3xl text-body-lg text-on-surface-variant">{show.summary}</p>
            <div className="mt-auto flex flex-wrap gap-space-sm">
              <button onClick={() => toggle(show)} aria-pressed={saved}
                className={`flex items-center gap-space-sm rounded-lg px-space-lg py-space-sm text-label-lg font-bold transition hover:-translate-y-0.5 ${
                  saved ? 'border border-white/15 bg-white/10 text-on-surface' : 'bg-primary text-on-primary shadow-[0_0_24px_rgba(192,193,255,0.35)] hover:bg-primary-fixed'}`}>
                <span className={`material-symbols-outlined text-[20px] ${saved ? 'icon-fill' : ''}`}>{saved ? 'bookmark_added' : 'bookmark_add'}</span>
                {saved ? 'Ada di Watchlist' : 'Tambah ke Watchlist'}
              </button>
              <Link to={`/review?show=${show.id}`} className="flex items-center gap-space-sm rounded-lg border border-white/15 bg-white/10 px-space-lg py-space-sm text-label-lg hover:bg-white/15">
                <span className="material-symbols-outlined text-[20px]">rate_review</span> Tulis Review
              </Link>
              {show.site && (
                <a href={show.site} target="_blank" rel="noreferrer" className="flex items-center gap-space-sm rounded-lg border border-white/15 bg-white/10 px-space-lg py-space-sm text-label-lg hover:bg-white/15">
                  <span className="material-symbols-outlined text-[20px]">open_in_new</span> Situs Resmi
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <Tabs tabs={[
        { to: base, end: true, label: 'Overview', icon: 'article' },
        { to: `${base}/cast`, label: 'Cast', icon: 'groups' },
        { to: `${base}/episodes`, label: 'Episode', icon: 'play_circle' },
        { to: `${base}/reviews`, label: 'Review', icon: 'rate_review' },
      ]} />
      <Outlet context={{ show }} />
    </div>
  );
}
