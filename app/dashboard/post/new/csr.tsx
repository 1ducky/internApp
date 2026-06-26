'use client'

import { FormPostOrchestration } from "@/component/form/post/form.orchestration";
import { UploadedAssetMetadata } from "@/services/objectStorage/object.dto";
import { ResponsePostApi } from "@/services/post/post.dto";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { postUpdateCacheClient } from "../post.cache-client";

export default function NewPostPageCsr({ tempImage, role }: { tempImage: UploadedAssetMetadata[], role: string }) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const handlerSubmitPost = async (value: unknown) => {
        console.log(value)
        try {
            const res = await fetch('/api/post', {
                method: 'POST',
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
                return true
                // const data = await res.json()
                // console.log(data)
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
        <FormPostOrchestration action={handlerSubmitPost} temp={tempImage} role={role} />
    )
}