import { postService } from "@/services/post/post.service"
import EditPostPageCSR from "./csr"

import { objectStorageService } from "@/services/objectStorage/obj.service"
import { forbidden, notFound, unauthorized } from "next/navigation"
import { AuthGuard } from "@/services/auth/auth.helper"


export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params

    const user = await AuthGuard({ status: 'ACTIVE', onUnauthorized: () => unauthorized(), onForbidden: () => forbidden(), permissions: ['post:update'] })
    if (!user.success || !user.data) throw new Error("Something went wrong")

    const post = await postService.getPostById(id)
    if (!post.success || !post.data) return notFound()
    if (post.data.authorId !== user.data.userId) return forbidden()

    const tempImage = await objectStorageService.getTempFileImage(user.data.userId)
    const sanitize = tempImage.success && tempImage.data ? tempImage.data.map(item => ({
        ...item,
        authorId: item.authorId as string,
    })) : []

    return (
        <EditPostPageCSR id={id} initialData={post.data} tempImage={sanitize} role={user.data.role} />
    )
}