import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import MovieCard from '../components/MovieCard.jsx';
import PageHero from '../components/PageHero.jsx';
import WatchlistItem from '../components/WatchlistItem.jsx';
import { useWatchlist } from '../context/WatchlistContext.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { fetchCatalog } from '../services/showService.js';

const TABS = [
  { id: 'all', label: 'Semua Film', test: () => true },
  { id: 'todo', label: 'Belum Ditonton', test: (i) => !i.watched },
  { id: 'done', label: 'Sudah Ditonton', test: (i) => i.watched },
  { id: 'fav', label: 'Favorit', test: (i) => i.favorite },
];

export default function WatchlistPage() {
  const { items, update, remove } = useWatchlist();
  const [params, setParams] = useSearchParams(); // URL state: ?tab=&q=
  const tab = params.get('tab') || 'all';
  const q = params.get('q') || '';
  const [layout, setLayout] = useState('grid'); // local state

  const setParam = (k, v) => {
    const n = new URLSearchParams(params);
    v && v !== 'all' ? n.set(k, v) : n.delete(k);
    setParams(n, { replace: true });
  };

  const active = TABS.find((t) => t.id === tab) || TABS[0];
  const shown = items.filter((i) => active.test(i) && i.name.toLowerCase().includes(q.trim().toLowerCase()));

  const watched = items.filter((i) => i.watched).length;
  const minutes = items.reduce((a, i) => a + (i.runtime || 0), 0);
  const progress = items.length ? Math.round((watched / items.length) * 100) : 0;

  // Rekomendasi: judul dari genre yang paling sering ada di watchlist
  const { data: catalog } = useFetch((s) => fetchCatalog(s), []);
  const recs = useMemo(() => {
    if (!catalog || !items.length) return [];
    const freq = {};
    items.forEach((i) => i.genres.forEach((g) => (freq[g] = (freq[g] || 0) + 1)));
    const ids = new Set(items.map((i) => i.id));
    return catalog.filter((s) => !ids.has(s.id) && s.rating)
      .map((s) => ({ s, score: s.genres.reduce((a, g) => a + (freq[g] || 0), 0) * 10 + s.rating }))
      .sort((a, b) => b.score - a.score).slice(0, 4).map((x) => x.s);
  }, [catalog, items]);

  return (
    <div className="flex flex-col gap-space-lg">
      <PageHero eyebrow="Koleksi Pribadi" title="Daftar Tontonan" accent="Saya"
        description="Catat target tontonan, tandai yang sudah selesai, beri rating dan catatan. Data tersimpan di browser Anda.">
        <div className="mt-space-md grid max-w-xl grid-cols-3 gap-space-sm">
          {[['Total Judul', items.length], ['Total Durasi', `${Math.round(minutes / 60)} jam`], ['Ditonton', `${watched}/${items.length}`]].map(([k, v]) => (
            <div key={k} className="glass rounded-xl p-space-md text-center">
              <div className="text-label-badge uppercase text-outline">{k}</div>
              <div className="text-headline-md tabular-nums text-primary">{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-space-md h-1.5 max-w-xl overflow-hidden rounded-full bg-surface-container-highest" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-gradient-to-r from-[#6366F1] to-[#E11D48] transition-all" style={{ width: `${progress}%` }} />
        </div>
      </PageHero>

      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex gap-space-xs overflow-x-auto rounded-xl bg-surface-container-low p-1.5">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setParam('tab', t.id)}
              className={`whitespace-nowrap rounded-lg px-space-md py-space-sm text-label-lg ${t.id === active.id ? 'bg-primary font-bold text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}>
              {t.label} <span className="ml-1 text-label-badge opacity-70">{items.filter(t.test).length}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-space-sm">
          <input value={q} onChange={(e) => setParam('q', e.target.value)} placeholder="Cari di antrean…" aria-label="Cari di watchlist" className="input-base w-48 py-1.5" />
          {['grid', 'list'].map((l) => (
            <button key={l} onClick={() => setLayout(l)} aria-label={`Tampilan ${l}`} aria-pressed={layout === l}
              className={`grid h-10 w-10 place-items-center rounded-lg ${layout === l ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}>
              <span className="material-symbols-outlined text-[20px]">{l === 'grid' ? 'grid_view' : 'view_list'}</span>
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <EmptyState icon="bookmarks" title={items.length ? 'Tidak ada yang cocok' : 'Watchlist masih kosong'}
          message={items.length ? 'Ubah tab atau kata kunci pencarian.' : 'Tekan ikon bookmark pada kartu film untuk menambahkannya.'}
          action={<Link to="/jelajah" className="rounded-lg bg-primary px-space-lg py-space-sm text-label-lg font-bold text-on-primary">Jelajahi Film</Link>} />
      ) : (
        <div className={layout === 'grid' ? 'grid gap-gutter-sm md:grid-cols-2 xl:grid-cols-3' : 'flex flex-col gap-gutter-sm'}>
          {shown.map((i) => <WatchlistItem key={i.id} item={i} layout={layout} onUpdate={update} onRemove={remove} />)}
        </div>
      )}

      {recs.length > 0 && (
        <section className="rounded-xl border border-white/5 bg-surface-container-low p-space-lg">
          <h2 className="text-headline-md">Rekomendasi untuk Anda</h2>
          <p className="mb-space-md text-body-md text-on-surface-variant">Berdasarkan genre yang paling sering ada di watchlist Anda.</p>
          <div className="grid grid-cols-2 gap-gutter-sm lg:grid-cols-4">{recs.map((s) => <MovieCard key={s.id} show={s} />)}</div>
        </section>
      )}
    </div>
  );
}
