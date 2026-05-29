import { Suspense } from "react"
import FeedLayout from "@/component/feed/feed.layout"
import FeedSidebar from "@/component/feed/feed.sidebar"
import FeedLazyLoad from "@/component/feed/feed.lazyload"
import { feedServices } from "@/services/feed/feed.service"
import { FeedClient } from "@/component/feed/feed.client"

export const revalidate = 60;

export default async function Homepage() {
  return (
    <FeedLayout sidebar={<FeedSidebar />}>
      <Suspense fallback={<FeedLazyLoad />}>
        <LazyPreview />
      </Suspense>
    </FeedLayout>
  )
}

async function LazyPreview() {
  const res = await feedServices.getFeed()

  if (res.Feeds.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Belum ada postingan aktif yang dipublikasikan.</p>
      </div>
    )
  }
  return <FeedClient initialData={res} />
}

