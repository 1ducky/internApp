import { Role, UserStatus } from "@/generated/prisma/enums"

export const userDomain = {
    isUserStatus,
    isUserRole
}

export const userStatus = {
    ACTIVE: UserStatus.ACTIVE,
    BANNED: UserStatus.BANNED,
    DELETED: UserStatus.DELETED,
} as const

export type TUserStatus = typeof userStatus[keyof typeof userStatus]

export const userRole = {
    ADMIN: Role.ADMIN,
    USER: Role.USER,
    PROVIDER: Role.PROVIDER,
} as const

export type TUserRole = typeof userRole[keyof typeof userRole]

// Domain Action

function isUserStatus(status: string): status is TUserStatus {
    return Object.values(userStatus).includes(status as TUserStatus)
}

function isUserRole(role: string): role is TUserRole {
    return Object.values(userRole).includes(role as TUserRole)
}
