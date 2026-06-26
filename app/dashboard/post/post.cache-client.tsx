import { InfiniteData, QueryClient } from "@tanstack/react-query";
import { FeedMetaProps, FeedPostProps } from "@/services/feed/feed.dto";

export function postUpdateCacheClient(
    queryClient: QueryClient,
    postId: string,
    updates: Partial<FeedPostProps>
) {
    queryClient.setQueriesData<InfiniteData<FeedMetaProps>>(
        { queryKey: ['feed'], exact: false },
        (oldData) => {
            if (!oldData) return oldData
            return {
                ...oldData,
                pages: oldData.pages.map((page) => {
                    const isExist = page.Feeds.some(post => post.id === postId)
                    return ({
                        ...page,
                        Feeds: isExist ? page.Feeds.map((post) =>
                            post.id === postId ? { ...post, ...updates } : post
                        ) : [updates as FeedPostProps, ...page.Feeds],
                    })
                }),
            }
        }
    )
}