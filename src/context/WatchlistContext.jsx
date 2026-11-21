import { createContext, useContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const WatchlistContext = createContext(null);

// Global state (Context API): daftar tontonan, tersimpan di localStorage
export function WatchlistProvider({ children }) {
  const [items, setItems] = useLocalStorage('nontonbos.watchlist', []);

  const has = useCallback((id) => items.some((i) => i.id === id), [items]);

  const toggle = useCallback((show) => {
    setItems((prev) =>
      prev.some((i) => i.id === show.id)
        ? prev.filter((i) => i.id !== show.id)
        : [
            {
              id: show.id, name: show.name, image: show.image, genres: show.genres,
              runtime: show.runtime, rating: show.rating, year: show.year, summary: show.summary,
              addedAt: new Date().toISOString(), watched: false, favorite: false, myRating: 0, note: '',
            },
            ...prev,
          ]
    );
  }, [setItems]);

  const update = useCallback((id, patch) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }, [setItems]);

  const remove = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), [setItems]);

  const value = useMemo(() => ({ items, has, toggle, update, remove }), [items, has, toggle, update, remove]);
  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist harus dipakai di dalam WatchlistProvider');
  return ctx;
};
