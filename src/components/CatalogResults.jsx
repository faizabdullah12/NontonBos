import { PAGE_SIZE } from '../hooks/useCatalog.js';
import { SORT_OPTIONS, STATUS_OPTIONS } from '../utils/catalog.js';
import EmptyState from './EmptyState.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import GenreChips from './GenreChips.jsx';
import MovieGrid from './MovieGrid.jsx';
import Pagination from './Pagination.jsx';
import SearchBar from './SearchBar.jsx';
import SelectField from './SelectField.jsx';
import SkeletonGrid from './SkeletonGrid.jsx';

/** Toolbar (search/filter/sort) + hasil + pagination. Murni tampilan: data datang dari useCatalog. */
export default function CatalogResults({ catalog, showSearch = true, showGenreChips = true }) {
  const { items, genres, total, loading, error, reload, filters, page, pageCount, setParam } = catalog;
  const hasFilter = filters.q || filters.genre || filters.status;

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="glass flex flex-col gap-space-md rounded-xl p-space-md">
        {showSearch && (
          <SearchBar value={filters.q} onSearch={(v) => setParam('q', v)} placeholder="Cari judul serial / film…" />
        )}
        {showGenreChips && (
          <GenreChips options={genres.slice(0, 12).map((g) => g.name)} value={filters.genre}
            onChange={(g) => setParam('genre', g)} allLabel="Semua Genre" />
        )}
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <SelectField label="Status:" value={filters.status} onChange={(v) => setParam('status', v)} options={STATUS_OPTIONS} />
          <SelectField label="Urutkan:" value={filters.sort} onChange={(v) => setParam('sort', v)} options={SORT_OPTIONS} />
        </div>
      </div>

      {loading ? (
        <SkeletonGrid count={8} />
      ) : error ? (
        <ErrorMessage message={error} onRetry={reload} />
      ) : items.length === 0 ? (
        <EmptyState title="Tidak ada hasil" message="Coba ubah kata kunci atau filter pencarian Anda."
          action={hasFilter && (
            <button onClick={() => { ['q', 'genre', 'status'].forEach((k) => setParam(k, '')); }}
              className="rounded-lg bg-primary px-space-lg py-space-sm text-label-lg font-bold text-on-primary">Reset Filter</button>
          )} />
      ) : (
        <>
          <MovieGrid shows={items} />
          <Pagination page={page} pageCount={pageCount} total={total} pageSize={PAGE_SIZE}
            onChange={(p) => { setParam('page', p > 1 ? String(p) : ''); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        </>
      )}
    </div>
  );
}
