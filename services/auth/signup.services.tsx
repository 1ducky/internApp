import { SignUpFutureResource } from "@clerk/nextjs/types"
import { SignUpSchema } from "./signup.schema"
import { logger } from "@/infrastructure/lib/logger"

export const SignUpServices = async (formData: FormData, signUp: SignUpFutureResource) => {
    logger.info("SignUp request received", 'SignUpServices')

    const credential = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        name: formData.get('name') as string
    }
    logger.info("Credential received", 'SignUpServices')
    const validate = SignUpSchema.safeParse(credential)
    if (!validate.success) {
        logger.error("Credential validation failed", 'SignUpServices')
        return {
            success: false,
            error: validate.error.flatten().fieldErrors
        }
    }
    logger.info("Credential validation success", 'SignUpServices')
    const result = await signUp.create({
        username: validate.data.name,
        emailAddress: validate.data.email,
        password: validate.data.password,

    })
    logger.info("User created", 'SignUpServices')
    console.log(result)
    return {
        success: true,
        data: result
    }


}

export const sendVerificationsSignUp = async (signUp: SignUpFutureResource) => {
    logger.info("Sending email verifications", 'sendVerificationsSignUp')
    await signUp.verifications.sendEmailCode()
    logger.info("Email verifications sent", 'sendVerificationsSignUp')
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

// export function hasPermission(role: string, permission: string): boolean {
//     logger.debug(role + permission, 'hasPermission')
//     return ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS].includes(permission)
// }

