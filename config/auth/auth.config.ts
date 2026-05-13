export const ROLE_PERMISSIONS = {
    USER: [
        'EDIT_PROFILE',
        'READ_HISTORY',
        "APPLY_OPPORTUNITY"
    ],

    PROVIDER: [
        'EDIT_PROFILE',
        "CREATE_OPPORTUNITY",
        "EDIT_OWN_OPPORTUNITY"
    ],

    ADMIN: [
        'EDIT_PROFILE',
        "BAN_USER",
        "VERIFY_PROVIDER"
    ]
}
