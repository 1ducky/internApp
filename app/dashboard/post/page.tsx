
import { FeedManagement } from "./csr"
import { forbidden, unauthorized } from "next/navigation"
import { PostToolbar } from "@/component/post.toolbar"
import { AuthGuard } from "@/services/auth/auth.helper"




export default async function PostPage(
    // props: {
    //     searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    // }
) {

    const user = await AuthGuard({ permissions: ['post:create', 'post:update', 'post:delete'], status: 'ACTIVE', onForbidden: () => forbidden(), onUnauthorized: () => unauthorized() })
    if (!user.success || !user.data) throw new Error("Something went wrong")
    return (
        <div className="w-full max-w-3xl mx-auto py-6">
            <PostToolbar />
            <FeedManagement viewer={user.data} />
        </div>
    )
}