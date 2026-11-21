import { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from './Badge.jsx';
import Poster from './Poster.jsx';
import StarInput from './StarInput.jsx';
import { formatDate, formatRuntime } from '../utils/format.js';

const NOTE_MAX = 120;

export default function WatchlistItem({ item, onUpdate, onRemove, layout = 'grid' }) {
  const [note, setNote] = useState(item.note); // form state (controlled)
  const tooLong = note.length > NOTE_MAX;

  const saveNote = () => { if (!tooLong) onUpdate(item.id, { note: note.trim() }); };
  const row = layout === 'list';

  return (
    <article className={`glass flex overflow-hidden rounded-xl ${row ? 'flex-row' : 'flex-col'}`}>
      <Link to={`/jelajah/${item.id}`} className={`relative block shrink-0 ${row ? 'w-28' : 'aspect-[16/10] w-full'}`}>
        <Poster src={item.image} alt={item.name} className="h-full w-full" />
        <div className="absolute left-space-sm top-space-sm">{item.watched ? <Badge tone="green">Selesai</Badge> : <Badge>Menunggu</Badge>}</div>
      </Link>
      <div className="flex flex-1 flex-col gap-space-sm p-space-md">
        <div className="flex items-center justify-between text-label-badge uppercase text-tertiary">
          <span className="line-clamp-1">{item.genres.slice(0, 2).join(' / ') || 'Umum'}</span>
          <span className="tabular-nums text-on-surface-variant">{formatRuntime(item.runtime)}</span>
        </div>
        <Link to={`/jelajah/${item.id}`} className="line-clamp-1 text-headline-sm hover:text-primary">{item.name}</Link>

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-space-sm text-body-sm">
            <input type="checkbox" checked={item.watched} onChange={(e) => onUpdate(item.id, { watched: e.target.checked })} className="h-4 w-4 accent-[#6366F1]" />
            Sudah ditonton
          </label>
          <button onClick={() => onUpdate(item.id, { favorite: !item.favorite })} aria-pressed={item.favorite} aria-label="Favorit"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface-container-high">
            <span className={`material-symbols-outlined text-[20px] ${item.favorite ? 'icon-fill text-secondary' : 'text-on-surface-variant'}`}>favorite</span>
          </button>
        </div>

        <div className="flex items-center gap-space-sm text-body-sm text-on-surface-variant">
          Rating pribadi: <StarInput value={item.myRating} onChange={(v) => onUpdate(item.id, { myRating: v })} label="Rating pribadi" />
        </div>

        <div>
          <input value={note} onChange={(e) => setNote(e.target.value)} onBlur={saveNote} onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
            placeholder="Catatan pribadi…" aria-label="Catatan pribadi" className="input-base py-1.5 text-body-sm" />
          {tooLong && <p role="alert" className="mt-1 text-body-sm text-error">Catatan maksimal {NOTE_MAX} karakter ({note.length}).</p>}
        </div>

        <div className="mt-auto flex items-center justify-between pt-space-xs text-body-sm text-outline">
          <span>Ditambahkan: {formatDate(item.addedAt)}</span>
          <button onClick={() => onRemove(item.id)} aria-label={`Hapus ${item.name}`} className="grid h-9 w-9 place-items-center rounded-full text-secondary hover:bg-error-container/30">
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      </div>
    </article>
  );
}
