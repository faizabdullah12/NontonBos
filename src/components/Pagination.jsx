function pageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, total, current - 1, current, current + 1]);
  const pages = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  pages.forEach((p, i) => {
    if (i && p - pages[i - 1] > 1) out.push('…');
    out.push(p);
  });
  return out;
}

export default function Pagination({ page, pageCount, total, pageSize, onChange }) {
  const from = total ? (page - 1) * pageSize + 1 : 0;
  const to = Math.min(page * pageSize, total);
  const btn = 'grid h-10 min-w-10 place-items-center rounded-lg px-2 text-label-lg transition';
  return (
    <div className="glass flex flex-col items-center justify-between gap-space-md rounded-xl p-space-md sm:flex-row">
      <p className="text-body-sm text-on-surface-variant">
        Menampilkan <b className="text-on-surface">{from}–{to}</b> dari <b className="text-on-surface">{total}</b> judul
      </p>
      <nav className="flex items-center gap-1" aria-label="Paginasi">
        <button className={`${btn} text-on-surface-variant hover:bg-surface-container-high disabled:opacity-30`} disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Sebelumnya">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        {pageList(page, pageCount).map((p, i) =>
          p === '…' ? (
            <span key={`e${i}`} className="px-1 text-outline">…</span>
          ) : (
            <button key={p} onClick={() => onChange(p)} aria-current={p === page ? 'page' : undefined}
              className={`${btn} ${p === page ? 'bg-primary font-bold text-on-primary' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
              {p}
            </button>
          )
        )}
        <button className={`${btn} text-on-surface-variant hover:bg-surface-container-high disabled:opacity-30`} disabled={page >= pageCount} onClick={() => onChange(page + 1)} aria-label="Berikutnya">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </nav>
    </div>
  );
}
