import { TUserRole, } from "@/services/user/user.domain"


export const PERMISSIONS = [
    'post:create',
    'post:create:announcement',
    'post:update',
    'post:update:announcement',
    'post:delete',
    'file:upload',
    'read:recap',
    'user:update',
    'user:management',
    'user:banning',
    'user:unbanning'
] as const

export type Permission =
    typeof PERMISSIONS[number]
export type ROLES_TYPE = TUserRole

export const PERMISSIONS_CONFIG = {
    ADMIN: [
        "post:create",
        "post:create:announcement",
        "post:update",
        "post:update:announcement",
        "post:delete",
        "file:upload",
        "read:recap",
        'user:update',
        'user:management',
        'user:banning',
        'user:unbanning'
    ],

    USER: [
        "post:create",
        "post:update",
        "post:delete",
        "file:upload",
    ],

    PROVIDER: [
        "post:create",
        "post:update",
        "post:delete",
        "file:upload",
    ]
}