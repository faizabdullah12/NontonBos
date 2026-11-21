import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import PageHero from '../components/PageHero.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import ReviewForm from '../components/ReviewForm.jsx';
import SelectField from '../components/SelectField.jsx';
import Spinner from '../components/Spinner.jsx';
import { useReviews } from '../context/ReviewContext.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { fetchCatalog } from '../services/showService.js';

export default function ReviewPage() {
  const [params] = useSearchParams();
  const { reviews, addReview, removeReview } = useReviews();
  const { data, loading, error, reload } = useFetch((s) => fetchCatalog(s), []);
  const [sort, setSort] = useState('new');

  const shows = useMemo(() => [...(data ?? [])].sort((a, b) => a.name.localeCompare(b.name)), [data]);
  const list = useMemo(() => [...reviews].sort((a, b) =>
    sort === 'top' ? b.rating - a.rating : new Date(b.createdAt) - new Date(a.createdAt)), [reviews, sort]);

  return (
    <div className="flex flex-col gap-space-lg">
      <PageHero eyebrow="Komunitas" title="Review" accent="Penonton" description="Bagikan pendapatmu dan baca review dari penonton lain. Review disimpan secara lokal di browser." />
      <div className="grid items-start gap-gutter lg:grid-cols-[400px_1fr]">
        {loading ? <Spinner /> : error ? <ErrorMessage message={error} onRetry={reload} /> :
          <ReviewForm shows={shows} initialShowId={params.get('show') || ''} onSubmit={addReview} />}
        <section className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <h2 className="text-headline-md">Semua Review ({reviews.length})</h2>
            <SelectField label="Urutkan:" value={sort} onChange={setSort} options={[{ value: 'new', label: 'Terbaru' }, { value: 'top', label: 'Rating Tertinggi' }]} />
          </div>
          {list.length === 0
            ? <EmptyState icon="rate_review" title="Belum ada review" message="Isi formulir untuk menulis review pertama." />
            : list.map((r) => <ReviewCard key={r.id} review={r} onDelete={removeReview} />)}
        </section>
      </div>
    </div>
  );
}
