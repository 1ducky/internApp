"use client"

import { useEffect, useState } from "react"
import { sendVerificationsSignUp, SignUpServices, verificationsCode } from "@/services/auth/signup.services"
import { SignUpForm } from "@/component/auth/SignUpForm"
import { SignUpData } from "@/services/auth/signup.schema"
import { useAuth, useSignUp } from "@clerk/nextjs"
import { EmailVerifyForm } from "@/component/auth/EmailVerifyForm"
import RedirectInformation from "@/component/auth/ComplateRedirect"
import { useRouter } from "next/navigation"

enum SignUpPhase {
  form = 'form',
  verifications = 'verify',
  success = 'success',
  error = 'error'
}

export default function SignUpPage() {
  const { signUp } = useSignUp();
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      router.replace('/')
    }
  }, [isSignedIn, isLoaded, router])


  const [error, setError] = useState({})
  const [message, setMessage] = useState<string>('')
  const [isBusy, setIsbusy] = useState(false)
  const [phase, setphase] = useState<SignUpPhase>(SignUpPhase.form)

  if (!isLoaded || isSignedIn) return null


  const signupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsbusy(true)
    setMessage('')
    setError({})
    try {
      const form = new FormData(e.currentTarget)
      const res = await SignUpServices(form, signUp)
      if (res.error || res.data.error) {
        setError(res.error || 'Terjadi Kesalahan')
        console.log(res.error)
        // setphase(SignUpPhase.error)
      } else {
        const verifications = await sendVerificationsSignUp(signUp)
        setMessage(verifications.data)
        setphase(SignUpPhase.verifications)
      }
    } catch {
      setError('Terjadi Kesalahan')
    } finally {
      setIsbusy(false)
      console.log(signUp.status)
    }
  }

  const verificationsHandler = async (code: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsbusy(true)
    setMessage('')
    setError({})
    try {
      const validateCode = await verificationsCode(signUp, code)
      if (validateCode.error) {
        setMessage(validateCode.error)
      } else {
        setMessage(validateCode.data ? validateCode.data : "")
      }
    } catch {
      setMessage('Kode Verifikasi Salah')

    } finally {
      setIsbusy(false)
    }



    console.log(signUp.status)
    if (signUp.status === 'complete') {
      setphase(SignUpPhase.success)
      router.push('/')
    }


  }

  return (
    <>
      {phase === SignUpPhase.form && (
        <SignUpForm
          action={signupHandler}
          Loading={isBusy}
          Errors={error as SignUpData}
        >
          <div id="clerk-captcha"></div>
        </SignUpForm>
      )}
      {phase === SignUpPhase.success && (
        <RedirectInformation EmailAddress={signUp.emailAddress} info={message} />
      )}
      {phase === SignUpPhase.verifications && (
        <EmailVerifyForm
          action={verificationsHandler}
          message={message}
          Loading={isBusy}
        />
      )}
    </>
  )
}