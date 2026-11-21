export default function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 gap-gutter-sm md:grid-cols-3 xl:grid-cols-4" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-xl bg-surface-container-low">
          <div className="aspect-[2/3] bg-surface-container-high" />
          <div className="space-y-2 p-space-md">
            <div className="h-4 w-3/4 rounded bg-surface-container-high" />
            <div className="h-3 w-full rounded bg-surface-container-high" />
          </div>
        </div>
      ))}
    </div>
  );
}
