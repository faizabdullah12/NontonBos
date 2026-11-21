import { useParams } from 'react-router-dom';
import CatalogResults from '../components/CatalogResults.jsx';
import { useCatalog } from '../hooks/useCatalog.js';

// Dynamic route: /kategori/:genre
export default function KategoriGenrePage() {
  const { genre } = useParams();
  const catalog = useCatalog({ fixedGenre: decodeURIComponent(genre) });
  return <CatalogResults catalog={catalog} showSearch={false} showGenreChips={false} />;
}
