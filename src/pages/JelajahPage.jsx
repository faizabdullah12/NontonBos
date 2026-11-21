import { Link } from 'react-router-dom';
import CatalogResults from '../components/CatalogResults.jsx';
import PageHero from '../components/PageHero.jsx';
import { useCatalog } from '../hooks/useCatalog.js';

export default function JelajahPage() {
  const catalog = useCatalog();
  const { filters, all, loading } = catalog;
  const top = !loading && !filters.q ? [...all].filter((s) => s.rating).sort((a, b) => b.rating - a.rating)[0] : null;

  return (
    <div className="flex flex-col gap-space-lg">
      <PageHero eyebrow="Jelajah" title="Temukan tontonan" accent="berikutnya"
        description="Cari, saring, dan urutkan ratusan film & serial dari TVMaze. Simpan favoritmu ke watchlist.">
        {top && (
          <Link to={`/jelajah/${top.id}`} className="mt-space-md inline-flex items-center gap-space-sm rounded-lg bg-primary px-space-lg py-space-sm text-label-lg font-bold text-on-primary shadow-[0_0_24px_rgba(192,193,255,0.35)] transition hover:-translate-y-0.5 hover:bg-primary-fixed">
            <span className="material-symbols-outlined icon-fill text-[20px]">star</span>
            Rating tertinggi: {top.name}
          </Link>
        )}
      </PageHero>
      <CatalogResults catalog={catalog} />
    </div>
  );
}
