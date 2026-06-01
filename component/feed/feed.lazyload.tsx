export default function FeedLazyLoad() {
  return (
    <div className="space-y-6">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl p-5 animate-pulse space-y-4"
        >
          {/* Header Skeleton */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="space-y-2 flex-1">
              <div className="h-3.5 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/3" />
              <div className="h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/4" />
            </div>
          </div>
          
          {/* Content Skeleton */}
          <div className="space-y-2 pt-2">
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4" />
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full" />
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-5/6" />
          </div>
          
          {/* Image/Asset Skeleton */}
          <div className="h-48 sm:h-64 bg-zinc-100 dark:bg-zinc-850 rounded-xl w-full" />
        </div>
      ))}
    </div>
  );
}
