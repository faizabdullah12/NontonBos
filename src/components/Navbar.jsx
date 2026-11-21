import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext.jsx';

const LINKS = [
  { to: '/jelajah', label: 'Jelajah Film' },
  { to: '/kategori', label: 'Kategori & Genre' },
  { to: '/watchlist', label: 'Watchlist' },
  { to: '/review', label: 'Komunitas Review' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false); // local state: menu mobile
  const [query, setQuery] = useState('');
  const { items } = useWatchlist();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate(`/jelajah?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  };

  const linkCls = ({ isActive }) =>
    `rounded-lg px-space-md py-space-sm text-label-lg transition-colors ${
      isActive ? 'bg-surface-container-high font-bold text-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface-container-lowest/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-gutter px-margin-mobile md:px-margin">
        <Link to="/" className="flex items-center gap-space-sm">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary-container to-tertiary-container">
            <span className="material-symbols-outlined icon-fill text-[20px] text-white">play_arrow</span>
          </span>
          <span className="text-headline-sm font-bold tracking-tight">Nonton<span className="text-primary">Bos</span></span>
          <span className="hidden items-center gap-1 text-label-md uppercase tracking-wider text-tertiary lg:flex"><span className="text-outline">/</span> Cinema Hub</span>
        </Link>

        <form onSubmit={submit} className="relative hidden max-w-md flex-1 xl:flex">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-outline">search</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari judul film atau serial…" aria-label="Pencarian global"
            className="w-full rounded-xl border border-transparent bg-surface-container py-space-sm pl-10 pr-4 text-body-sm outline-none transition placeholder:text-outline focus:border-[#6366F1] focus:ring-[3px] focus:ring-[#6366F1]/25" />
        </form>

        <nav className="hidden items-center gap-space-xs md:flex" aria-label="Navigasi utama">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkCls}>
              {l.label}
              {l.to === '/watchlist' && items.length > 0 && (
                <span className="ml-1.5 rounded-full bg-secondary-container px-1.5 py-0.5 text-[10px] text-on-secondary-container">{items.length}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <button className="grid h-10 w-10 place-items-center rounded-full hover:bg-surface-container md:hidden" onClick={() => setOpen((o) => !o)}
          aria-expanded={open} aria-label="Buka menu">
          <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
        </button>
      </div>

      {open && (
        <div className="space-y-space-sm border-t border-white/5 bg-surface-container-lowest/95 p-margin-mobile md:hidden">
          <form onSubmit={submit}>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari judul…" className="input-base" aria-label="Cari" />
          </form>
          <nav className="flex flex-col" aria-label="Navigasi mobile">
            {LINKS.map((l) => <NavLink key={l.to} to={l.to} className={linkCls} onClick={() => setOpen(false)}>{l.label}</NavLink>)}
          </nav>
        </div>
      )}
    </header>
  );
}
