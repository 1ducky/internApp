import { SignUpFutureResource } from "@clerk/nextjs/types"
import { SignUpSchema } from "./signup.schema"
import { ROLE_PERMISSIONS } from "@/config/auth/auth.config"
import { logger } from "@/infrastructure/lib/logger"


export const SignUpServices = async (formData: FormData, signUp: SignUpFutureResource) => {

    const credential = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        name: formData.get('name') as string
    }
    const validate = SignUpSchema.safeParse(credential)
    if (!validate.success) {
        return {
            success: false,
            error: validate.error.flatten().fieldErrors
        }
    }
    const result = await signUp.create({
        username: validate.data.name,
        emailAddress: validate.data.email,
        password: validate.data.password,

    })
    console.log(result)
    return {
        success: true,
        data: result
    }


}

export const sendVerificationsSignUp = async (signUp: SignUpFutureResource) => {
    await signUp.verifications.sendEmailCode()
    return {
        success: true,
        data: 'Email verifications sent'
    }
}

export const verificationsCode = async (signUp: SignUpFutureResource, code: string) => {
    const verifications = await signUp.verifications.verifyEmailCode({ code: code })
    if (verifications.error) {
        return {
            success: false,
            error: verifications.error.message
        }
    }
    return {
        success: true,
        data: 'Email verifications success'
    }
}

export function hasPermission(role: string, permission: string): boolean {
    logger.debug(role + permission, 'hasPermission')
    return ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS].includes(permission)
}