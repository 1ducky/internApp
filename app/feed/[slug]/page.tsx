import { notFound } from "next/navigation"
import { getAuthSessionClerk } from "@/services/clerk/clerk.session"
// import FeedPost from "@/component/feed/feed.post"
import { FeedDetailProps } from "@/services/feed/feed.dto"
import { Suspense } from "react"
import FeedLayout from "@/component/feed/feed.layout"
import FeedSidebar from "@/component/feed/feed.sidebar"
import FeedLazyLoad from "@/component/feed/feed.lazyload"
import { BookOpen } from "lucide-react"
import { FeedDetailCSR } from "./csr"

export default async function FeedDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    if (!slug) return notFound()
    return (

        <FeedLayout
            sidebar={<FeedSidebar />}
            title={<span><BookOpen size={20} /> Detail Postingan</span>}
            description="Baca ulasan selengkapnya seputar pengumuman penting, event seru, dan obrolan menarik hari in">
            <Suspense fallback={<FeedLazyLoad />}>
                <LazyPreview slug={slug} />
            </Suspense>
        </FeedLayout>
    )
}


async function LazyPreview({ slug }: { slug: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/${slug}`)
    const data = await res.json()
    const user = await getAuthSessionClerk()
    const feed = data?.feed as FeedDetailProps
    if (!feed) return notFound()
    return <FeedDetailCSR initialData={feed} viewer={user}>
        <></>
    </FeedDetailCSR>
}

