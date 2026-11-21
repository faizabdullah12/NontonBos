import { Navigate } from 'react-router-dom';
// /kategori -> arahkan ke genre default
export default function KategoriIndexPage() {
  return <Navigate to="/kategori/Science-Fiction" replace />;
}
