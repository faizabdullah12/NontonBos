import { NavLink, Outlet, useMatch } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Spinner from '../components/Spinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { fetchCatalog } from '../services/showService.js';
import { collectGenres } from '../utils/catalog.js';

// Layout bersarang: /kategori/* -> sidebar genre + <Outlet/> berisi daftar per genre
export default function KategoriLayout() {
  const match = useMatch('/kategori/:genre');
  const current = match ? decodeURIComponent(match.params.genre) : '';
  const { data, loading, error, reload } = useFetch((s) => fetchCatalog(s), []);

  if (loading) return <Spinner label="Memuat kategori…" />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const genres = collectGenres(data);
  const inGenre = data.filter((s) => s.genres.includes(current));
  const rated = inGenre.filter((s) => s.rating);
  const avg = rated.length ? rated.reduce((a, s) => a + s.rating, 0) / rated.length : 0;

  return (
    <div className="flex flex-col gap-space-lg">
      <PageHero eyebrow="Kurasi Genre" title="Kategori &" accent={current || 'Genre'}
        description={`Jelajahi judul bergenre ${current || 'pilihan Anda'} dari katalog TVMaze.`}>
        <div className="mt-space-md flex flex-wrap gap-space-lg">
          <div><div className="text-headline-lg tabular-nums">{inGenre.length}</div><div className="text-body-sm text-on-surface-variant">Judul</div></div>
          <div><div className="text-headline-lg tabular-nums text-tertiary">{avg ? avg.toFixed(1) : '—'}</div><div className="text-body-sm text-on-surface-variant">Rata-rata rating</div></div>
          <div><div className="text-headline-lg tabular-nums text-secondary">{inGenre.filter((s) => s.status === 'Running').length}</div><div className="text-body-sm text-on-surface-variant">Masih tayang</div></div>
        </div>
      </PageHero>

      <div className="grid gap-gutter lg:grid-cols-[260px_1fr]">
        <aside className="glass h-fit rounded-xl p-space-md lg:sticky lg:top-24">
          <h2 className="mb-space-sm px-space-sm text-label-badge uppercase tracking-wider text-outline">Kategori ({genres.length})</h2>
          <nav className="flex gap-space-xs overflow-x-auto lg:max-h-[60vh] lg:flex-col lg:overflow-y-auto" aria-label="Daftar genre">
            {genres.map((g) => (
              <NavLink key={g.name} to={`/kategori/${encodeURIComponent(g.name)}`}
                className={({ isActive }) => `flex items-center justify-between gap-space-md whitespace-nowrap rounded-lg px-space-md py-space-sm text-label-lg transition ${
                  isActive ? 'bg-surface-container-high font-bold text-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}>
                {g.name}<span className="text-label-badge tabular-nums text-outline">{g.total}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
        <section><Outlet context={{ genres }} /></section>
      </div>
    </div>
  );
}
