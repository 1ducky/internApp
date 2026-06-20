import { ClerkSession } from "../clerk/clerk.session"
import { TUserStatus } from "../user/user.domain"

export const authDomain = {
    CheckStatus
}

function CheckStatus(user: ClerkSession, expectedStatus: TUserStatus): boolean {
    if (user.status === expectedStatus) {
        return true
    }
    return false
}

