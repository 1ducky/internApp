'use client'
import { UserProfileForm } from "@/component/dashboard/profile/userProfile"
import { ProfileSubmitInput } from "@/services/user/profile.schema"

export default function CsrProfile({ email }: { email: string }) {
    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const payload = {
            gender: formData.get('gender'),
            birthDate: formData.get('birthDate'),
            bio: formData.get('bio'),
            phoneNumber: formData.get('phoneNumber'),
            location: formData.get('location')

        }
        console.log(payload)

    }


    return (
        <>
            <UserProfileForm action={handlerSubmit} email={email} />
        </>
    )
}