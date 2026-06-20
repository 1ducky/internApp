import { Permission } from "@/config/auth/auth.config"
import { TUserRole, TUserStatus, userDomain } from "../user/user.domain"
import { authService } from "./auth.service"
import { hasPermission } from "./auth.client"
import { failed, ok } from "@/utils/responseMapper"
import { AppError } from "@/libs/error"

type AuthGuardType = {
    status?: TUserStatus
    role?: TUserRole[]
    permissions?: Permission[]
}

export async function AuthGuard(options?: AuthGuardType) {
    const session = await authService.getSession()
    try {
        if (!session) {
            throw new AppError(401, 'UNAUTHORIZED', 'Unauthorized')
        }
        if (options?.role) {
            const allowed = options.role.some(
                role =>
                    userDomain.isUserRole(session.role) && session.role === role
            )
            if (!allowed) {
                throw new AppError(403, 'FORBIDDEN_ROLE', 'Forbidden: Role is not Valid')
            }
        }

        if (options?.status) {
            const allowed = userDomain.isUserStatus(session.status) && session.status === options.status
            if (!allowed) {
                throw new AppError(403, 'FORBIDDEN_STATUS', 'Forbidden: status is not Valid')
            }
        }

        if (options?.permissions) {
            const allowed = options.permissions.some(
                permission =>
                    hasPermission(
                        session.role,
                        permission
                    )
            )

            if (!allowed) {
                throw new AppError(403, 'FORBIDDEN_PERMISSION', 'Forbidden: permission is not Valid')
            }
        }
        return ok(session, 'Successfully authenticated')
    } catch (e) {
        if (e instanceof AppError) {
            return failed(e.code, e.error, e.message)
        }
        return failed(500, 'INTERNAL_SERVER_ERROR', 'Internal Server Error')
    }


}