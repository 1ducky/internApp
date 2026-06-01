import { postService } from "@/services/post/post.service"
import EditPostPageCSR from "./csr"
import { authService } from "@/services/auth/auth.service"
import { objectStorageService } from "@/services/objectStorage/obj.service"


export default async function EditPostPage({ params }: { params: { id: string } }) {

    const { id } = await params

    const post = await postService.getPostById(id)
    const user = await authService.getSession()
    const tempImage = await objectStorageService.getTempFileImage(user.userId)
    const sanitize = tempImage.success && tempImage.data ? tempImage.data.map(item => ({
        ...item,
        authorId: item.authorId as string,
    })) : []
    if (!post.success) {
        return <div>Post not found</div>
    }


    return (
        <EditPostPageCSR id={id} initialData={post.data} tempImage={sanitize} />
    )
}