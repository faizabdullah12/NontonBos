export default function PageHero({ eyebrow, title, accent, description, children }) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-surface-container to-surface-container-lowest p-space-lg md:p-space-xl">
      <div className="pointer-events-none absolute -left-10 top-0 h-72 w-72 rounded-full bg-primary-container/20 blur-[110px]" />
      <div className="relative">
        {eyebrow && <span className="mb-space-sm inline-block rounded bg-primary-container/30 px-space-sm py-1 text-label-badge uppercase text-primary-fixed">{eyebrow}</span>}
        <h1 className="text-headline-xl-mobile md:text-display-hero">
          {title} {accent && <span className="bg-gradient-to-r from-primary via-tertiary to-tertiary-fixed-dim bg-clip-text text-transparent">{accent}</span>}
        </h1>
        {description && <p className="mt-space-sm max-w-2xl text-body-lg text-on-surface-variant">{description}</p>}
        {children}
      </div>
    </section>
  );
}
