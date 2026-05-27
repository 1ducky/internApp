'use client'

import PostForm from "@/component/post/formPost";
import { UploadedAssetMetadata } from "@/services/objectStorage/object.dto";
import { useRouter } from "next/navigation";

export default function NewPostPageCsr({ tempImage }: { tempImage: UploadedAssetMetadata[] }) {
    const router = useRouter()
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
            if (res.status === 200) {
                router.push('/dashboard/post')
                // const data = await res.json()
                // console.log(data)
            } else {
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <PostForm action={handlerSubmitPost} tempImage={tempImage} />
    )
}