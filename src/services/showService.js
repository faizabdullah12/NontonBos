import { getJson } from './http.js';
import { normalizeShow, normalizeCast, normalizeEpisode } from '../utils/mappers.js';

const BASE = 'https://api.tvmaze.com';

// Katalog: 2 halaman pertama (500 judul)
export async function fetchCatalog(signal) {
  const pages = await Promise.all([0, 1].map((p) => getJson(`${BASE}/shows?page=${p}`, { signal })));
  return pages.flat().map(normalizeShow);
}

export async function searchShows(query, signal) {
  const data = await getJson(`${BASE}/search/shows?q=${encodeURIComponent(query)}`, { signal });
  return data.map((r) => normalizeShow(r.show));
}

export async function fetchShow(id, signal) {
  return normalizeShow(await getJson(`${BASE}/shows/${id}`, { signal }));
}

export async function fetchCast(id, signal) {
  return (await getJson(`${BASE}/shows/${id}/cast`, { signal })).map(normalizeCast);
}

export async function fetchEpisodes(id, signal) {
  return (await getJson(`${BASE}/shows/${id}/episodes`, { signal })).map(normalizeEpisode);
}
