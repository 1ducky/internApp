
import { objectStorageService } from "@/services/objectStorage/obj.service"
import NewPostPageCsr from "./csr"
import { forbidden, unauthorized } from "next/navigation"
import { AuthGuard } from "@/services/auth/auth.helper"


export default async function NewPostPage() {
    const user = await AuthGuard({ status: 'ACTIVE', onUnauthorized: () => unauthorized(), onForbidden: () => forbidden(), permissions: ['post:create'] })
    if (!user.success || !user.data) throw new Error("Something went wrong")
    const tempImage = await objectStorageService.getTempFileImage(user.data.userId)
    const sanitize = tempImage.success && tempImage.data ? tempImage.data.map(item => ({
        ...item,
        authorId: item.authorId as string,
    })) : []

    return (
        <NewPostPageCsr tempImage={sanitize} role={user.data.role} />
    )
}