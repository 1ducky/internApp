import { cacheTag, revokeCache } from "@/libs/cache";
import { AuthGuard } from "@/services/auth/auth.helper";
import { commentService } from "@/services/comment/comment.service";
import { unstable_cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const getCacheCommentFeed = (postid: string) => unstable_cache(
    async (postid: string, cursor?: string) => {
        console.log('🔴 CACHE MISS - fetching from DB, cursor:', cursor)
        return await commentService.getCommentsByPostId(postid, cursor)
    },
    ['feed', 'comment'],
    {
        revalidate: 5 * 60 * 60,
        tags: [cacheTag.comment.post(postid), cacheTag.feed.post(postid)]
    }
)


export async function POST(req: Request, { params }: { params: Promise<{ postid: string }> }) {
    const { postid } = await params
    if (!postid) {
        return NextResponse.json({ error: "Feed not found" }, { status: 404 })
    }
    const user = await AuthGuard({ status: 'ACTIVE' })
    if (!user.success || !user.data) {
        return NextResponse.json({ error: user.message }, { status: user.status })
    }
    const body = await req.json()
    if (!body.content || !postid) {
        console.log(body, postid)
        return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }
    const comment = await commentService.addComment(user.data.userId, body.content, postid)
    if (!comment) {
        return NextResponse.json({ error: "Failed to add comment" }, { status: 500 })
    }
    revokeCache(cacheTag.comment.post(postid))
    return NextResponse.json({ comment }, { status: 200 })
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ postid: string }> }) {
    const { postid } = await params
    const cursor = req.nextUrl.searchParams.get('cursor') ?? undefined
    if (!postid) {
        return NextResponse.json({ error: "Feed not found" }, { status: 404 })
    }
    const comments = await getCacheCommentFeed(postid)(postid, cursor)
    if (!comments) {
        return NextResponse.json({ error: "Failed to get comments" }, { status: 500 })
    }
    return NextResponse.json({ comments }, { status: 200 })
}