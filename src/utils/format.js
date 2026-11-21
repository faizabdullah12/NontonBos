export const formatRuntime = (min) => {
  if (!min) return '—';
  const h = Math.floor(min / 60), m = min % 60;
  return h ? `${h}j ${m}m` : `${m}m`;
};
export const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
export const formatRating = (r) => (r ? r.toFixed(1) : 'N/A');
export const statusLabel = (s) => ({ Running: 'Tayang', Ended: 'Tamat', 'To Be Determined': 'TBD' }[s] || s || '—');
