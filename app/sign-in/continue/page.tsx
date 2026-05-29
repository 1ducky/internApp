import AuthProcessing from "@/component/auth/AuthProcessing"
import { AuthenticateWithRedirectCallback, } from "@clerk/nextjs"

export const dynamic = 'force-dynamic';

export default function ContinuePage() {
    return (
        <>
            <div id="clerk-captcha"></div>
            <AuthenticateWithRedirectCallback signInForceRedirectUrl={'/'} signUpForceRedirectUrl={'/'} />
            <AuthProcessing />

        </>
    )
}