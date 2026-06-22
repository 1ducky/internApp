import { UserManagementDTO, UserManagementMeta } from "@/services/user/user.dto"
import { buildQueryString, QueryOptions } from "@/utils/queryBuilder"
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const useInfiniteUserQuery = (initialData: UserManagementDTO[], limit: number, options?: QueryOptions, nextCursor?: string) => {
    const isDefaultQuery = !options || Object.keys(options).length === 0

    return useInfiniteQuery({
        queryKey: ['users', options ?? "all"],
        queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
            const query = buildQueryString({ ...options, cursor: pageParam, limit: limit })
            console.log(options)
            const res = await fetch(`/api/user${query}`)
            const data = await res.json() as UserManagementMeta
            return data
        },
        initialPageParam: '',
        getNextPageParam: (lastPage: UserManagementMeta) => {
            if (lastPage.user.length < limit) {
                return undefined
            }
            return lastPage.nextCursor ?? undefined
        },
        initialData: isDefaultQuery ? {
            pages: [{ user: initialData, limit: limit, nextCursor: nextCursor }],
            pageParams: [''],
        } : undefined,
        staleTime: 60 * 1000,
        gcTime: Infinity,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData
    })

}

export const useInfiniteObserver = (observerRef: React.RefObject<HTMLDivElement | null>, hasNextPage: boolean, isFetchingNextPage: boolean, fetchNextPage: () => void) => useEffect(() => {
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
}, [observerRef, hasNextPage, isFetchingNextPage, fetchNextPage])