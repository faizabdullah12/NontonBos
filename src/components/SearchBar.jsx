import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce.js';


export default function SearchBar({ value, onSearch, placeholder = 'Cari judul…', className = '' }) {
  const [text, setText] = useState(value);
  const debounced = useDebounce(text, 450);

  useEffect(() => setText(value), [value]);
  useEffect(() => { if (debounced !== value) onSearch(debounced);}, [debounced]);

  return (
    <div className={`relative flex items-center ${className}`}>
      <span className="material-symbols-outlined pointer-events-none absolute left-3 text-[20px] text-outline">search</span>
      <input type="search" value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder}
        aria-label="Cari" className="input-base pl-10" />
    </div>
  );
}
