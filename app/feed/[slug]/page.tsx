import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAuthSessionClerk } from "@/services/clerk/clerk.session"
import { Suspense } from "react"
import FeedLayout from "@/component/feed/feed.layout"
import FeedSidebar from "@/component/feed/feed.sidebar"
import FeedLazyLoad from "@/component/feed/feed.lazyload"
import { BookOpen } from "lucide-react"
import { FeedDetailCSR } from "./csr"
import Image from "next/image"
import { renderFormattedDescription } from "@/utils/feed/ContentFormater"
import { FeedCache } from "@/services/feed/feed.cache"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const res = await FeedCache.detailFeed(slug)

    if (!res) {
        return {
            title: 'Not Found',
            description: 'The page is not found.'
        }
    }

    return {
        title: res.title,
        description: res.description,
        openGraph: {
            title: res.title,
            description: res.description,
            images: res.assets && res.assets.length > 0 ? [res.assets[0].fileUrl] : [],
        }
    }
}

export default async function FeedDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    console.log(slug)
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
    const res = await FeedCache.detailFeed(slug)
    const user = await getAuthSessionClerk()
    if (!res) return notFound()
    return (
        <article>
            {/* POST HEADER */}
            <div className="p-5 sm:p-6 border-b border-zinc-100 dark:border-zinc-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3.5">

                    <div className="flex items-center space-x-3.5">
                        {/* Author Avatar with Animated border */}
                        <div className="relative group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2.5px] transition-transform duration-300 group-hover:rotate-6">
                                <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-2xl flex items-center justify-center p-[2.5px] overflow-hidden relative">
                                    {res.author.avatar ? (
                                        <Image
                                            src={res.author.avatar}
                                            alt={res.author.username || 'Author'}
                                            fill
                                            sizes="48px"
                                            className="rounded-xl object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-xs font-bold text-white uppercase tracking-wider">
                                            {res.author.username?.split('')[0]}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-sm sm:text-base text-zinc-800 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">
                            {res.author.username || 'Pengguna InternApp'}
                        </span>
                        {res.author.username && (
                            <span className="text-xs text-zinc-400 dark:text-zinc-500">
                                @{res.author.username}
                            </span>
                        )}
                    </div>

                </div>
            </div>

            {/* POST HEADER END */}
            <div className="p-6 sm:p-8 pb-4">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight tracking-tight mb-4">
                    {res.title}
                </h1>


            </div>
            <div className="text-zinc-850 dark:text-zinc-200">
                {renderFormattedDescription(res.description)}
            </div>
            <FeedDetailCSR initialData={res} viewer={user} />
        </article>
    )
}

