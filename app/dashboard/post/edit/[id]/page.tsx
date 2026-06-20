import { postService } from "@/services/post/post.service"
import EditPostPageCSR from "./csr"

import { objectStorageService } from "@/services/objectStorage/obj.service"
import { forbidden, unauthorized } from "next/navigation"
import { AuthGuard } from "@/services/auth/auth.helper"


export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params

    const post = await postService.getPostById(id)
    const user = await AuthGuard({ status: 'ACTIVE', onUnauthorized: () => unauthorized(), onForbidden: () => forbidden(), permissions: ['post:update'] })
    if (!user.success || !user.data) throw new Error("Something went wrong")
    const tempImage = await objectStorageService.getTempFileImage(user.data.userId)
    const sanitize = tempImage.success && tempImage.data ? tempImage.data.map(item => ({
        ...item,
        authorId: item.authorId as string,
    })) : []
    if (!post.success) {
        return <div>Post not found</div>
    }


    return (
        <EditPostPageCSR id={id} initialData={post.data} tempImage={sanitize} role={user.data.role} />
    )
}