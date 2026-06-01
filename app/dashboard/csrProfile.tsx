'use client'
import { UserProfileForm } from "@/component/dashboard/profile/userProfile"
import { ProfileSchema } from "@/services/profile/profile.schema"


export default function CsrProfile({ email, data }: { email: string, data: unknown }) {
    const profileData = ProfileSchema.safeParse(data)

    const handlerSubmit = async (value: unknown) => {


        try {
            const res = await fetch('/api/profile', {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
                method: "POST",

            })
            const data = await res.json()
            if (data.success) {
                alert('Profile Submitted')
            } else if (!data.success) {
                alert(data.message)
                console.log(data.error)
            }
        }
        catch {
            alert('something went wrong try again')
        }

    }
    return (
        <>
            <UserProfileForm action={handlerSubmit} email={email} profileData={profileData.success ? profileData.data : null} />
        </>
    )
}