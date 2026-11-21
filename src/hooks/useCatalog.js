import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetch } from './useFetch.js';
import { fetchCatalog, searchShows } from '../services/showService.js';
import { collectGenres, filterShows, paginate, sortShows } from '../utils/catalog.js';

export const PAGE_SIZE = 12;

/**
 * Menggabungkan server state (API) + URL state (q, genre, status, sort, page)
 * lalu menghasilkan data siap tampil. `fixedGenre` dipakai halaman /kategori/:genre.
 */
export function useCatalog({ fixedGenre = '' } = {}) {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const genre = fixedGenre || params.get('genre') || '';
  const status = params.get('status') || '';
  const sort = params.get('sort') || 'rating';
  const page = Math.max(1, Number(params.get('page')) || 1);

  const { data, loading, error, reload } = useFetch(
    (signal) => (q.trim() ? searchShows(q.trim(), signal) : fetchCatalog(signal)),
    [q.trim()]
  );

  const all = useMemo(() => data ?? [], [data]);
  const filtered = useMemo(() => sortShows(filterShows(all, { genre, status }), sort), [all, genre, status, sort]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const items = useMemo(() => paginate(filtered, safePage, PAGE_SIZE), [filtered, safePage]);
  const genres = useMemo(() => collectGenres(all), [all]);

  // ubah satu parameter URL; ubah filter => kembali ke halaman 1
  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    if (key !== 'page') next.delete('page');
    setParams(next, { replace: key === 'q' });
  };

  return {
    all, items, genres, total: filtered.length, loading, error, reload,
    filters: { q, genre, status, sort }, page: safePage, pageCount, setParam,
  };
}
