import { createContext, useContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const ReviewContext = createContext(null);

const SEED = [
  { id: 'seed-1', showId: 82, showName: 'Game of Thrones', author: 'Rina', rating: 5, spoiler: false,
    text: 'Dunia ceritanya luas dan intrik politiknya bikin susah berhenti nonton. Wajib untuk pecinta fantasi.',
    createdAt: '2026-10-02T10:00:00.000Z' },
  { id: 'seed-2', showId: 169, showName: 'Breaking Bad', author: 'Dimas', rating: 5, spoiler: false,
    text: 'Perkembangan karakternya luar biasa, tiap season makin tegang dan penulisannya sangat rapi.',
    createdAt: '2026-10-11T14:30:00.000Z' },
];

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useLocalStorage('nontonbos.reviews', SEED);

  const addReview = useCallback((review) => {
    setReviews((prev) => [{ ...review, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...prev]);
  }, [setReviews]);

  const removeReview = useCallback((id) => setReviews((prev) => prev.filter((r) => r.id !== id)), [setReviews]);

  const value = useMemo(() => ({ reviews, addReview, removeReview }), [reviews, addReview, removeReview]);
  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
}

export const useReviews = () => {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error('useReviews harus dipakai di dalam ReviewProvider');
  return ctx;
};
