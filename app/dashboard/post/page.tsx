import PostLayout from "@/component/post/layout"
import InstagramPost from "@/component/post/postComponent"
import { hasPermission } from "@/services/clerk/clerk.service"
import { postService } from "@/services/post/post.service"
import { currentUser } from "@clerk/nextjs/server"
import { forbidden, unauthorized } from "next/navigation"

export default async function postPage() {
    const user = await currentUser()
    if (!user) return unauthorized()

    const role = user.publicMetadata.role
    const isAuthorized = hasPermission(role, 'post:create')
    if (!isAuthorized) return forbidden()

    const res = await postService.getUserAllPost(user.publicMetadata)


    return (
        <>
            <PostLayout>
                {res.success ? (
                    res.data?.map((item, index) => {
                        const formattedItem = {
                            ...item,
                            createdAt: new Date(item.createdAt).toISOString(),
                            updatedAt: new Date(item.updatedAt).toISOString(),
                        }
                        return (
                            <li key={index}>
                                <InstagramPost post={formattedItem} />
                            </li>
                        )
                    })
                ) : (
                    <div>{res.message}</div>
                )}
            </PostLayout>
        </>
    )
}