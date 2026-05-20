"use client"

import { EmailVerifyForm } from "@/component/auth/EmailVerifyForm"
import SignInForm from "@/component/auth/LoginForm"
import { useAuth, useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SignInPage() {
    const { signIn } = useSignIn()
    const { isSignedIn, isLoaded } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showCode, setShowCode] = useState(false)

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
            const res = await signIn.create({
                identifier: form.get('identifier') as string,
                password: form.get('password') as string,
            })
            if (res.error) {
                setError('email atau password salah')
            }
            if (signIn.status === 'needs_second_factor') {
                await signIn.mfa.sendEmailCode()
                setShowCode(true)
            }
            if (signIn.status === 'complete') {
                router.push('/')
            }

        } catch {

            setError('Email atau password salah')
        } finally {
            setLoading(false)
        }
    }

    const verificationsMfaHandler = async (code: string, e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const validateCode = await signIn.mfa.verifyEmailCode({ code: code })
            if (validateCode.error) {
                console.log(validateCode.error)
                setError('code salah')
            } else {
                router.push('/')
            }
        } catch {
            setError('Kode Verifikasi Salah')

        } finally {
            setLoading(false)
        }
    }

    if (showCode) {
        return (
            <>
                <EmailVerifyForm Loading={loading} action={verificationsMfaHandler} message={error} />
            </>
        )
    }


    return (
        <>
            <SignInForm Loading={loading} Error={error} action={SignInAction} />
        </>
    )
}