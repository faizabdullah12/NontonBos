// Fungsi murni untuk filter / sort / paginasi (tanpa React)
export const SORT_OPTIONS = [
  { value: 'rating', label: 'Rating Tertinggi' },
  { value: 'name', label: 'Nama (A–Z)' },
  { value: 'newest', label: 'Terbaru' },
  { value: 'oldest', label: 'Terlama' },
];
export const STATUS_OPTIONS = [
  { value: '', label: 'Semua Status' },
  { value: 'Running', label: 'Sedang Tayang' },
  { value: 'Ended', label: 'Tamat' },
];

export function filterShows(list, { q = '', genre = '', status = '' }) {
  const needle = q.trim().toLowerCase();
  return list.filter(
    (s) =>
      (!needle || s.name.toLowerCase().includes(needle)) &&
      (!genre || s.genres.includes(genre)) &&
      (!status || s.status === status)
  );
}

export function sortShows(list, sort) {
  const arr = [...list];
  const by = {
    rating: (a, b) => (b.rating ?? -1) - (a.rating ?? -1),
    name: (a, b) => a.name.localeCompare(b.name),
    newest: (a, b) => (b.year ?? 0) - (a.year ?? 0),
    oldest: (a, b) => (a.year ?? 9999) - (b.year ?? 9999),
  };
  return arr.sort(by[sort] || by.rating);
}

export const paginate = (list, page, size) => list.slice((page - 1) * size, page * size);

export function collectGenres(list) {
  const count = {};
  list.forEach((s) => s.genres.forEach((g) => (count[g] = (count[g] || 0) + 1)));
  return Object.entries(count).sort((a, b) => b[1] - a[1]).map(([name, total]) => ({ name, total }));
}
