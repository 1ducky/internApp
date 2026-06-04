// import { postService } from "@/services/post/post.service"
// import { forbidden, unauthorized } from "next/navigation"
// import { PostPageClient } from "./postClient"
import { authService } from "@/services/auth/auth.service"
// import { hasPermission } from "@/services/clerk/clerk.service"
import { FeedManagement } from "./csr"
import { unauthorized } from "next/navigation"
import { PostToolbar } from "@/component/post.toolbar"



export default async function PostPage(
    // props: {
    //     searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    // }
) {
    // const searchParams = await props.searchParams;
    const user = await authService.getSession()
    if (!user) unauthorized()
    // if(!hasPermission(user.role,'post:create')) forbidden()

    // const res = await postService.getUserAllPost(user.userId)

    // if(!res.success) return <div>{res.message}</div>
    return (
        <div className="w-full max-w-3xl mx-auto py-6">
            <PostToolbar />
            <FeedManagement viewer={user} />
        </div>
    )
}