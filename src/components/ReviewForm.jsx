import { useState } from 'react';
import FormField from './FormField.jsx';
import StarInput from './StarInput.jsx';
import { validateReview } from '../utils/validators.js';

const EMPTY = { author: '', rating: 0, text: '', spoiler: false };

export default function ReviewForm({ shows, initialShowId = '', onSubmit }) {
  const [values, setValues] = useState({ ...EMPTY, showId: initialShowId });
  const [touched, setTouched] = useState({});
  const [done, setDone] = useState(false);

  const errors = validateReview(values);
  const show = (f) => (touched[f] ? errors[f] : undefined);
  const set = (f, v) => { setDone(false); setValues((p) => ({ ...p, [f]: v })); };
  const blur = (f) => setTouched((t) => ({ ...t, [f]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ showId: true, author: true, rating: true, text: true });
    if (Object.keys(errors).length) return;
    const chosen = shows.find((s) => String(s.id) === String(values.showId));
    onSubmit({ showId: chosen.id, showName: chosen.name, author: values.author.trim(), rating: values.rating, text: values.text.trim(), spoiler: values.spoiler });
    setValues({ ...EMPTY, showId: values.showId });
    setTouched({});
    setDone(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="glass flex flex-col gap-space-md rounded-xl p-space-lg">
      <h2 className="text-headline-md">Tulis Review</h2>
      {done && <p role="status" className="rounded-lg bg-emerald-500/15 px-space-md py-space-sm text-body-md text-emerald-300">Review berhasil ditambahkan!</p>}

      <FormField label="Judul" htmlFor="showId" error={show('showId')}>
        <select id="showId" value={values.showId} onChange={(e) => set('showId', e.target.value)} onBlur={() => blur('showId')} className="input-base">
          <option value="">— Pilih judul —</option>
          {shows.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </FormField>

      <FormField label="Nama" htmlFor="author" error={show('author')}>
        <input id="author" value={values.author} onChange={(e) => set('author', e.target.value)} onBlur={() => blur('author')} placeholder="Nama Anda" className="input-base" />
      </FormField>

      <FormField label="Rating" error={show('rating')}>
        <StarInput value={values.rating} onChange={(v) => { set('rating', v); blur('rating'); }} />
      </FormField>

      <FormField label="Komentar" htmlFor="text" error={show('text')} hint={`${values.text.length}/300 karakter (minimal 20)`}>
        <textarea id="text" rows={4} value={values.text} onChange={(e) => set('text', e.target.value)} onBlur={() => blur('text')} placeholder="Ceritakan pendapat Anda…" className="input-base resize-y" />
      </FormField>

      <label className="flex items-center gap-space-sm text-body-md">
        <input type="checkbox" checked={values.spoiler} onChange={(e) => set('spoiler', e.target.checked)} className="h-4 w-4 accent-[#6366F1]" />
        Mengandung spoiler
      </label>

      <button type="submit" className="rounded-lg bg-primary px-space-lg py-space-sm text-label-lg font-bold text-on-primary transition hover:-translate-y-0.5 hover:bg-primary-fixed">
        Kirim Review
      </button>
    </form>
  );
}
