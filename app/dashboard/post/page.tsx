import { getClerkUserSSR, hasPermission } from "@/services/clerk/clerk.service"
import { postService } from "@/services/post/post.service"
import { forbidden, unauthorized } from "next/navigation"
import { PostPageClient } from "./postClient"



export default async function PostPage() {
    const user = await getClerkUserSSR()
    if(!user) return unauthorized()
    const isAuthorized = hasPermission(user.publicMetadata.role, 'post:create')
    if (!isAuthorized) return forbidden()

    const res = await postService.getUserAllPost(user.publicMetadata)

    if(!res.success) return <div>{res.message}</div>
    return (
        <>
            <PostPageClient data={res.data}/>
        </>
    )
}