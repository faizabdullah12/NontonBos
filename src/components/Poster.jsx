import { useState } from 'react';

export default function Poster({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-surface-container-high to-surface-container-lowest text-outline ${className}`} aria-label={alt}>
        <span className="material-symbols-outlined text-[40px]">movie</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}
