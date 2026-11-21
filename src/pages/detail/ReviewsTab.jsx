import { Link, useOutletContext } from 'react-router-dom';
import EmptyState from '../../components/EmptyState.jsx';
import ReviewCard from '../../components/ReviewCard.jsx';
import { useReviews } from '../../context/ReviewContext.jsx';

export default function ReviewsTab() {
  const { show } = useOutletContext();
  const { reviews, removeReview } = useReviews();
  const list = reviews.filter((r) => r.showId === show.id);
  if (!list.length)
    return <EmptyState icon="rate_review" title="Belum ada review" message="Jadilah yang pertama menulis review untuk judul ini."
      action={<Link to={`/review?show=${show.id}`} className="rounded-lg bg-primary px-space-lg py-space-sm text-label-lg font-bold text-on-primary">Tulis Review</Link>} />;
  return <div className="grid gap-gutter-sm md:grid-cols-2">{list.map((r) => <ReviewCard key={r.id} review={r} onDelete={removeReview} />)}</div>;
}
