import AuthProcessing from "@/component/auth/AuthProcessing"
import { AuthenticateWithRedirectCallback, useSignUp } from "@clerk/nextjs"

export default function ContinuePage() {
    return (
        <>
            <div id="clerk-captcha"></div>
            <AuthProcessing />

            <AuthenticateWithRedirectCallback />
        </>
    )
}