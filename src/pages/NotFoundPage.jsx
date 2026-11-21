import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';

export default function NotFoundPage() {
  return (
    <EmptyState icon="movie_off" title="404 — Halaman tidak ditemukan" message="Alamat yang Anda tuju tidak ada."
      action={<Link to="/jelajah" className="rounded-lg bg-primary px-space-lg py-space-sm text-label-lg font-bold text-on-primary">Ke Jelajah Film</Link>} />
  );
}
