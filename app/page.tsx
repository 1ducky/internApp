import { Suspense } from "react"
import FeedLayout from "@/component/feed/feed.layout"
import FeedSidebar from "@/component/feed/feed.sidebar"
import FeedLazyLoad from "@/component/feed/feed.lazyload"
// import { feedServices } from "@/services/feed/feed.service"
import { FeedClient } from "@/component/feed/feed.client"
import { Flame } from "lucide-react"
import { feedServices } from "@/services/feed/feed.service"
import { authService } from "@/services/auth/auth.service"
import { FeedOptions } from "@/component/feed/feed.options"

export const revalidate = 60;

export default async function Homepage({ searchParams }: { searchParams: Promise<{ type: string | undefined }> }) {
  return (
    <FeedLayout sidebar={<FeedSidebar />} title={<>
      <Flame size={20} className="text-amber-500" />
      Semua Postingan Terkini
    </>}>
      <Suspense fallback={<FeedLazyLoad />}>
        <FeedOptions />
        <LazyPreview searchParams={searchParams} />
      </Suspense>
    </FeedLayout>
  )
}

async function LazyPreview({ searchParams }: { searchParams: Promise<{ type: string | undefined }> }) {
  const { type } = await searchParams
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/feed`)
  // const data = await res.json()
  // const feed = data.feed as FeedMetaProps
  // const user = await authService.getSession()
  // const feed = await feedServices.getFeed()
  const [user, feed] = await Promise.all([
    authService.getSession(),
    feedServices.getFeed(undefined, type)
  ])



  if (feed.Feeds.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Belum ada postingan aktif yang dipublikasikan.</p>
      </div>
    )
  }
  return <FeedClient initialData={feed} viewer={user} option={type ? { type } : undefined} />
  // return <>hello</>
}

