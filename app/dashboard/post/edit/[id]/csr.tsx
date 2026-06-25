"use client"
import { FormPostOrchestration } from "@/component/form/post/form.orchestration"
import { UploadedAssetMetadata } from "@/services/objectStorage/object.dto"
import { PostDto, ResponsePostApi } from "@/services/post/post.dto"
import { useRouter } from "next/navigation"
import { postUpdateCacheClient } from "../../post.cache-client"
import { useQueryClient } from "@tanstack/react-query"

export default function EditPostPageCSR({ id, initialData, tempImage, role }: { id: string, initialData: PostDto, tempImage?: UploadedAssetMetadata[] | [], role: string }) {
    const router = useRouter()
    const queryClient = useQueryClient()

    async function handlerEditPost(value: unknown) {
        try {
            const res = await fetch(`/api/post/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value),
            })
            const post = await res.json() as ResponsePostApi
            if (res.status === 200) {
                if (post.data && post.data.id) {
                    postUpdateCacheClient(queryClient, post.data.id, post.data)
                }
                router.push('/dashboard/post')
                // const data = await res.json()
                // console.log(data)
                return true
            } else {
                console.log('Failed to submit post')
                console.log(res)
                return false
            }

        } catch (error) {
            console.log(error)
            return null
        }
    }

    return (
        // <PostForm
        //     initialData={initialData}
        //     action={handlerEditPost}
        //     tempImage={tempImage}
        // />
        <FormPostOrchestration initialData={initialData} temp={tempImage} action={handlerEditPost} role={role} />
    )
}