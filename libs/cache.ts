import { revalidateTag } from "next/cache"

export const cacheTag = {
    feed: {
        all: () => 'feed:all',
        type: (type?: string) => `feed:${type ?? 'all'}`,
        post: (postId: string) => `feed:post:${postId}`,
        slug: (slug: string) => `feed:slug:${slug}`,
        user: (userId?: string) => `feed:user:${userId ?? 'all'}`
    },
    profile: {
        user: (userId: string) => `profile:${userId}`,
        public: (userId: string) => `profile:public:${userId}`
    },
    comment: {
        post: (postId: string) => `comment:post:${postId}`,
    },
    recap: {
        type: (type?: string) => `recap:${type ?? 'all'}`,
        date: (start: Date, end: Date) => `recap:date:${start.toISOString()}-${end.toISOString()}`
    }
}

export const revokeCache = (...tags: string[]) => {
    [...new Set(tags)].forEach(tag => revalidateTag(tag, 'default'))
}