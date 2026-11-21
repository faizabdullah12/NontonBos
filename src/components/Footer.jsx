export default function Footer() {
  return (
    <footer className="mt-space-xl border-t border-white/5 bg-surface-container-lowest">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-space-md px-margin-mobile py-space-lg text-body-sm text-on-surface-variant md:flex-row md:px-margin">
        <p><b className="text-on-surface">NontonBos</b> © {new Date().getFullYear()} — Data dari <a className="text-primary hover:underline" href="https://www.tvmaze.com/api" target="_blank" rel="noreferrer">TVMaze API</a></p>
        <p>Dibuat dengan React, React Router & Tailwind CSS</p>
      </div>
    </footer>
  );
}
