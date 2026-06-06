import { PERMISSIONS_CONFIG, ROLES, ROLES_TYPE } from "@/config/auth/auth.config"

export function hasPermission(role: unknown, permission: string) {
    if (typeof role === 'string' && ROLES.includes(role as ROLES_TYPE)) {
        return PERMISSIONS_CONFIG[role as ROLES_TYPE].includes(permission)
    }
    return false
}