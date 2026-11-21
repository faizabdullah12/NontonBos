import MovieCard from './MovieCard.jsx';

export default function MovieGrid({ shows }) {
  return (
    <div className="grid grid-cols-2 gap-gutter-sm md:grid-cols-3 xl:grid-cols-4">
      {shows.map((s) => <MovieCard key={s.id} show={s} />)}
    </div>
  );
}
