import { postService } from "@/services/post/post.service"
import EditPostPageCSR from "./csr"


export default async function EditPostPage({ params }: { params: { id: string } }) {

    const { id } = await params

    const post = await postService.getPostById(id)
    if(!post.success){
        return <div>Post not found</div>
    }


    return (
        <EditPostPageCSR id={id} initialData={post.data} />
    )
}