'use client'
import { FeedMetaProps } from "@/services/feed/feed.dto"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import FeedPost from "@/component/feed/feed.post"
import { useUser } from "@clerk/nextjs"
import { FeedHighLight } from "@/component/feed/feed.higlight"
import { ClerkSession } from "@/services/clerk/clerk.session"
import { useConfirm } from "@/provider/comfirm-provider"
import Link from "next/link"
import { PenBoxIcon, Trash } from "lucide-react"

// dapatkan initial state dari server cache
// dapatkan nilai id terahir untuk cursor
// lihat div kosng sebagai triger fetch
// fetch data baru jika terlihat
// simpan data ke array daya
// jika hasil data kurang dari expeted maka disable fetch


export const FeedManagement = ({ viewer }: { viewer: ClerkSession }) => {
    const confirm = useConfirm()
    const queryClient = useQueryClient()

    const [activeImage, setActiveImage] = useState<string | undefined>(undefined);
    const observerRef = useRef<HTMLDivElement>(null)
    function onZoom(val: string | undefined) {
        setActiveImage(val)
    }
    const handleDelete = async (id: string) => {
        const ok = await confirm({
            actionLabel: "Hapus",
            title: "Yakin ingin menghapus postingan?",
            description: "Tindakan ini tidak dapat dibatalkan atau lebih baik draf Postingan saja jika tidak ingin dipublikasikan",
            consequences: ['Postingan akan dihapus secara permanen', 'Semua data terkait postingan akan hilang'],
        })
        if (!ok) return
        try {
            const res = await fetch(`/api/post/${id}`, {
                method: "DELETE",
            })
            if (res.status === 200) {
                // Berhasil dihapus, lakukan sesuatu seperti refresh data atau tampilkan notifikasi
                console.log('Post deleted successfully')
                queryClient.setQueryData(['feed', viewer.userId], (oldData: any) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        pages: oldData.pages.map((page: any) => ({
                            ...page,
                            Feeds: page.Feeds.filter((item: any) => item.id !== id)
                        }))
                    }
                })
                // setPost(prev => prev.filter(item => item.id !== id))
            } else {
                console.log('Failed to delete post')
                console.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ['feed', viewer.userId],
        queryFn: async ({ pageParam }) => {
            const res = await fetch(`/api/post/me?cursor=${pageParam}`)
            const data = await res.json()
            return data.feed as FeedMetaProps
        },
        initialPageParam: '',
        getNextPageParam: (lastPage) => {
            if (lastPage.Feeds.length < 10) return undefined
            return lastPage.NextCursor ?? undefined
        },
        staleTime: 5 * 60 * 1000,
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
                <FeedPost key={feed.id} post={feed} viewer={viewer} onZoom={onZoom} option={
                    <>
                        <Link href={`/dashboard/post/edit/${feed.id}`} className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150 flex gap-4">
                            <PenBoxIcon size={20} /> Edit Feed
                        </Link>
                        <button onClick={() => handleDelete(feed.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-150 flex gap-4">
                            <Trash size={20} /> Hapus Postingan
                        </button>
                    </>
                } />
            ))}
            {hasNextPage || isLoading ? (
                <div ref={observerRef} className="py-4 flex items-center justify-center">
                    {isFetchingNextPage && <p className="text-sm text-zinc-500">Memuat...</p>}
                </div>
            ) : (
                <div className="flex items-center justify-center py-4">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Tidak ada postingan lagi</p>
                </div>
            )}
            {activeImage && (
                <FeedHighLight onCloseAction={setActiveImage} src={activeImage} />
            )}
        </>
    )
}