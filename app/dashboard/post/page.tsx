// import { postService } from "@/services/post/post.service"
// import { forbidden, unauthorized } from "next/navigation"
// import { PostPageClient } from "./postClient"
import { authService } from "@/services/auth/auth.service"
// import { hasPermission } from "@/services/clerk/clerk.service"
import { FeedManagement } from "./csr"
import { unauthorized } from "next/navigation"



export default async function PostPage() {
    const user = await authService.getSession()
    if (!user) unauthorized()
    // if(!hasPermission(user.role,'post:create')) forbidden()

    // const res = await postService.getUserAllPost(user.userId)

    // if(!res.success) return <div>{res.message}</div>
    return (
        <>
            <FeedManagement viewer={user} />
        </>
    )
}