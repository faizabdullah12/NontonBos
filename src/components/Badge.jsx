const TONES = {
  neutral: 'bg-surface-container-high/80 text-on-surface-variant',
  primary: 'bg-primary-container/30 text-primary-fixed',
  cyan: 'bg-[rgba(56,189,248,0.08)] border border-[rgba(56,189,248,0.2)] text-tertiary',
  crimson: 'bg-secondary-container text-on-secondary-container',
  green: 'bg-emerald-500/15 text-emerald-300',
};

export default function Badge({ tone = 'neutral', children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded px-space-sm py-[3px] font-label-badge text-label-badge uppercase ${TONES[tone]} ${className}`}>
      {children}
    </span>
  );
}
