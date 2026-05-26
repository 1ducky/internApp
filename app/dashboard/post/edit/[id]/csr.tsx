"use client"
import PostForm from "@/component/post/formPost"
import { UploadedAssetMetadata } from "@/services/objectStorage/object.dto"
import { PostDto } from "@/services/post/post.dto"
import { useRouter } from "next/navigation"

export default function EditPostPageCSR({ id, initialData, tempImage }: { id: string, initialData: PostDto, tempImage?: UploadedAssetMetadata[] | [] }) {
    const router = useRouter()

    async function handlerEditPost(value: unknown) {
        try {
            const res = await fetch(`/api/post/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value),
            })
            if (res.status === 200) {
                router.push('/dashboard/post')
                // const data = await res.json()
                // console.log(data)
            } else {
                console.log('Failed to submit post')
                console.log(res)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <PostForm
            initialData={initialData}
            action={handlerEditPost}
            tempImage={tempImage}
        />
    )
}