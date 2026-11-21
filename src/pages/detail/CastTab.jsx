import { useOutletContext } from 'react-router-dom';
import EmptyState from '../../components/EmptyState.jsx';
import ErrorMessage from '../../components/ErrorMessage.jsx';
import Poster from '../../components/Poster.jsx';
import Spinner from '../../components/Spinner.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import { fetchCast } from '../../services/showService.js';

export default function CastTab() {
  const { show } = useOutletContext();
  const { data, loading, error, reload } = useFetch((s) => fetchCast(show.id, s), [show.id]);
  if (loading) return <Spinner label="Memuat pemeran…" />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;
  if (!data.length) return <EmptyState icon="groups" title="Data pemeran belum tersedia" />;
  return (
    <div className="grid grid-cols-2 gap-gutter-sm sm:grid-cols-3 lg:grid-cols-5">
      {data.slice(0, 20).map((c) => (
        <div key={c.id} className="glass overflow-hidden rounded-xl">
          <Poster src={c.photo} alt={c.person} className="aspect-[3/4] w-full" />
          <div className="p-space-md">
            <div className="line-clamp-1 text-label-lg">{c.person}</div>
            <div className="line-clamp-1 text-body-sm text-outline">sebagai {c.character}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
