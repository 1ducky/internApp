"use client"

import SignInForm from "@/component/auth/LoginForm"
import { useAuth, useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SignInPage() {
    const { signIn } = useSignIn()
    const { isSignedIn, isLoaded } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const router = useRouter()
    useEffect(() => {
        if (isSignedIn && isLoaded) {
            router.replace('/')
        }
    }, [isSignedIn, isLoaded, router])
    if (!isLoaded || isSignedIn) return null


    async function SignInAction(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const form = new FormData(e.currentTarget)
            await signIn.create({
                identifier: form.get('identifier') as string,
                password: form.get('password') as string,
            })
            router.replace('/')

        } catch {

            setError('Email atau password salah')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <SignInForm Loading={loading} Error={error} action={SignInAction} />
        </>
    )
}