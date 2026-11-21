import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import KategoriLayout from './layouts/KategoriLayout.jsx';
import DetailLayout from './layouts/DetailLayout.jsx';
import JelajahPage from './pages/JelajahPage.jsx';
import KategoriIndexPage from './pages/KategoriIndexPage.jsx';
import KategoriGenrePage from './pages/KategoriGenrePage.jsx';
import WatchlistPage from './pages/WatchlistPage.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import OverviewTab from './pages/detail/OverviewTab.jsx';
import CastTab from './pages/detail/CastTab.jsx';
import EpisodesTab from './pages/detail/EpisodesTab.jsx';
import ReviewsTab from './pages/detail/ReviewsTab.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/jelajah" replace />} />
        <Route path="jelajah" element={<JelajahPage />} />

        {/* dynamic route + nested route */}
        <Route path="jelajah/:id" element={<DetailLayout />}>
          <Route index element={<OverviewTab />} />
          <Route path="cast" element={<CastTab />} />
          <Route path="episodes" element={<EpisodesTab />} />
          <Route path="reviews" element={<ReviewsTab />} />
        </Route>

        <Route path="kategori" element={<KategoriLayout />}>
          <Route index element={<KategoriIndexPage />} />
          <Route path=":genre" element={<KategoriGenrePage />} />
        </Route>

        <Route path="watchlist" element={<WatchlistPage />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
