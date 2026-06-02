import { authService } from "@/services/auth/auth.service"
import { objectStorageService } from "@/services/objectStorage/obj.service"
import NewPostPageCsr from "./csr"
import { unauthorized } from "next/navigation"


export default async function NewPostPage() {
    const user = await authService.getSession()
    if (!user) unauthorized()
    const tempImage = await objectStorageService.getTempFileImage(user.userId)
    const sanitize = tempImage.success && tempImage.data ? tempImage.data.map(item => ({
        ...item,
        authorId: item.authorId as string,
    })) : []

    return (
        <NewPostPageCsr tempImage={sanitize} />
    )
}