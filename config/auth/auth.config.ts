
export const ROLES = ['ADMIN', 'USER', 'PROVIDER'] as const
export type ROLES_TYPE = typeof ROLES[number]

export const PERMISSIONS_CONFIG = {
    ADMIN: [
        "post:create",
        "post:update",
        "post:delete",
    ],

    USER: [
        "post:create",
        "post:update",
        "post:delete",
    ],

    PROVIDER: [
        "post:create",
        "post:update",
        "post:delete",
    ]
}