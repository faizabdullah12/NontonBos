const stripHtml = (html = '') => (html || '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();

export function normalizeShow(s) {
  return {
    id: s.id,
    name: s.name,
    genres: s.genres ?? [],
    status: s.status, // Running | Ended | To Be Determined
    runtime: s.runtime || s.averageRuntime || null,
    rating: s.rating?.average ?? null,
    year: s.premiered ? Number(s.premiered.slice(0, 4)) : null,
    premiered: s.premiered,
    ended: s.ended,
    language: s.language,
    network: s.network?.name || s.webChannel?.name || null,
    country: s.network?.country?.name || null,
    site: s.officialSite,
    image: s.image?.medium ?? null,
    imageLarge: s.image?.original ?? null,
    summary: stripHtml(s.summary) || 'Sinopsis belum tersedia.',
  };
}

export const normalizeCast = (c) => ({
  id: `${c.person.id}-${c.character.id}`,
  person: c.person.name,
  photo: c.person.image?.medium ?? null,
  character: c.character.name,
});

export const normalizeEpisode = (e) => ({
  id: e.id,
  name: e.name,
  season: e.season,
  number: e.number,
  airdate: e.airdate,
  runtime: e.runtime,
  rating: e.rating?.average ?? null,
  image: e.image?.medium ?? null,
  summary: stripHtml(e.summary),
});
