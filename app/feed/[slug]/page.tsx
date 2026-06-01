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
import { feedServices } from "@/services/feed/feed.service"

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
    const res = await feedServices.getDetailFeed(slug)
    const user = await getAuthSessionClerk()
    if (!res) return notFound()
    return <FeedDetailCSR initialData={res} viewer={user}>
        <></>
    </FeedDetailCSR>
}

