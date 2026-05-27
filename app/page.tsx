import { postService } from "@/services/post/post.service"
import { Suspense } from "react"
import FeedPost, { FeedPostProps } from "@/component/feed/feed.post"
import FeedLayout from "@/component/feed/feed.layout"
import FeedSidebar from "@/component/feed/feed.sidebar"
import FeedLazyLoad from "@/component/feed/feed.lazyload"

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
  const res = await postService.getFeedPost()

  if (!res.success || !res.data) {
    return (
      <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Tidak ada postingan untuk ditampilkan saat ini.</p>
      </div>
    )
  }

  // Cast feed data ke tipe FeedPostProps[]
  const posts = res.data as unknown as FeedPostProps[]

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Belum ada postingan aktif yang dipublikasikan.</p>
      </div>
    )
  }

  return (
    <>
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </>
  )
}

