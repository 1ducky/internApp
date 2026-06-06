
export const ROLES = ['ADMIN', 'USER', 'PROVIDER'] as const
export type ROLES_TYPE = typeof ROLES[number]

export const PERMISSIONS_CONFIG = {
    ADMIN: [
        "post:create",
        "post:create:announcement",
        "post:update",
        "post:update:announcement",
        "post:delete",
        "file:upload",
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