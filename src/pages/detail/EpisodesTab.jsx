import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import EmptyState from '../../components/EmptyState.jsx';
import ErrorMessage from '../../components/ErrorMessage.jsx';
import Spinner from '../../components/Spinner.jsx';
import RatingStar from '../../components/RatingStar.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import { fetchEpisodes } from '../../services/showService.js';
import { formatDate } from '../../utils/format.js';

export default function EpisodesTab() {
  const { show } = useOutletContext();
  const { data, loading, error, reload } = useFetch((s) => fetchEpisodes(show.id, s), [show.id]);
  const [season, setSeason] = useState(1); // local state
  const seasons = useMemo(() => [...new Set((data ?? []).map((e) => e.season))], [data]);

  if (loading) return <Spinner label="Memuat episode…" />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;
  if (!data.length) return <EmptyState icon="video_library" title="Episode belum tersedia" />;

  const current = seasons.includes(season) ? season : seasons[0];
  const list = data.filter((e) => e.season === current);

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex gap-space-sm overflow-x-auto pb-1">
        {seasons.map((s) => (
          <button key={s} onClick={() => setSeason(s)}
            className={`whitespace-nowrap rounded-full border px-space-md py-1.5 text-label-md ${s === current ? 'border-transparent bg-[#6366F1] text-white' : 'border-white/10 bg-surface-container/80 text-on-surface-variant'}`}>
            Season {s}
          </button>
        ))}
      </div>
      <ul className="flex flex-col gap-space-sm">
        {list.map((e) => (
          <li key={e.id} className="glass flex items-center gap-space-md rounded-xl p-space-md">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface-container-high text-label-lg tabular-nums text-primary">{e.number ?? '•'}</span>
            <div className="min-w-0 flex-1">
              <div className="line-clamp-1 text-label-lg">{e.name}</div>
              <div className="text-body-sm text-outline">{formatDate(e.airdate)}{e.runtime ? ` · ${e.runtime} mnt` : ''}</div>
            </div>
            {e.rating && <RatingStar value={e.rating} className="text-body-sm" />}
          </li>
        ))}
      </ul>
    </div>
  );
}
