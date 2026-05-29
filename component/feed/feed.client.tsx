'use client'
import { FeedMetaProps } from "@/services/feed/feed.dto"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import FeedPost from "./feed.post"
import { getFeed } from "@/services/feed/feed.clientAction"

// dapatkan initial state dari server cache
// dapatkan nilai id terahir untuk cursor
// lihat div kosng sebagai triger fetch
// fetch data baru jika terlihat
// simpan data ke array daya
// jika hasil data kurang dari expeted maka disable fetch


export const FeedClient = ({ initialData }: { initialData: FeedMetaProps }) => {
    const observerRef = useRef<HTMLDivElement>(null)

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['feeds'],
        queryFn: ({ pageParam }: { pageParam: string | undefined }) => getFeed(pageParam),
        initialPageParam: '',
        getNextPageParam: (lastPage) => {
            if (lastPage.Feeds.length < 10) return undefined
            return lastPage.NextCursor ?? undefined
        },
        initialData: {
            pages: [initialData],
            pageParams: [''],
        },
        enabled: initialData.Feeds.length >= 10,
        staleTime: 60 * 1000,
        gcTime: Infinity,
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            },
            { threshold: 0.1 }  // trigger saat 10% div terlihat
        )

        if (observerRef.current) observer.observe(observerRef.current)

        return () => observer.disconnect()
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])
    const feeds = data?.pages.flatMap((page) => page.Feeds)
    return (
        <>
            {feeds?.map((feed) => (
                <FeedPost key={feed.id} post={feed} />
            ))}
            {hasNextPage ? (
                <div ref={observerRef} className="py-4 flex items-center justify-center">
                    {isFetchingNextPage && <p className="text-sm text-zinc-500">Memuat...</p>}
                </div>
            ) : (
                <div className="flex items-center justify-center py-4">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Tidak ada postingan lagi</p>
                </div>
            )}
        </>
    )
}