import { useOutletContext } from 'react-router-dom';
import { formatDate, formatRuntime, statusLabel } from '../../utils/format.js';

export default function OverviewTab() {
  const { show } = useOutletContext();
  const rows = [
    ['Status', statusLabel(show.status)],
    ['Tayang perdana', formatDate(show.premiered)],
    ['Tamat', show.ended ? formatDate(show.ended) : '—'],
    ['Durasi', formatRuntime(show.runtime)],
    ['Bahasa', show.language || '—'],
    ['Jaringan', [show.network, show.country].filter(Boolean).join(' · ') || '—'],
  ];
  return (
    <div className="grid gap-gutter lg:grid-cols-3">
      <div className="glass rounded-xl p-space-lg lg:col-span-2">
        <h2 className="mb-space-sm text-headline-md">Sinopsis</h2>
        <p className="text-body-lg leading-relaxed text-on-surface-variant">{show.summary}</p>
      </div>
      <dl className="glass rounded-xl p-space-lg">
        <h2 className="mb-space-sm text-headline-md">Informasi</h2>
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-space-md border-b border-white/5 py-space-sm text-body-md last:border-0">
            <dt className="text-outline">{k}</dt><dd className="text-right tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
