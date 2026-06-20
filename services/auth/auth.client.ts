import { PERMISSIONS_CONFIG } from "@/config/auth/auth.config"
import { userDomain } from "../user/user.domain"

export function hasPermission(role: string, permission: string) {
    if (userDomain.isUserRole(role)) {
        return PERMISSIONS_CONFIG[role].includes(permission)
    }
    return false
}