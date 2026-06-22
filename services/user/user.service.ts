
import { userDomain } from "./user.domain"
import { userRepository, userRepositoryTransaction } from "./user.repository"
import { setUserMetaData } from "../clerk/clerk.session"
import { logger } from "@/infrastructure/lib/logger"
import { ResponseUpdateUserDTO, toUserManagementDto, UserManagementErrorCode, UserManagementMeta } from "./user.dto"

export const userService = {
    ChangeUserAuthorizedFromId,
    getUserManagement
}

async function ChangeUserAuthorizedFromId(userId: string, statusTo: string, roleTo: string): Promise<ResponseUpdateUserDTO> {
    logger.info('Change user status request', 'ChangeUserAuthorizedFromId')
    try {
        if (!userDomain.isUserStatus(statusTo)) {
            logger.error('Invalid status or role Enum', 'ChangeUserAuthorizedFromId')
            return { success: false, status: 400, message: 'Invalid Status or Role', error_code: UserManagementErrorCode.INVALID_STATUS }
        }
        if (!userDomain.isUserRole(roleTo)) {
            logger.error('Invalid role Enum', 'ChangeUserAuthorizedFromId')
            return { success: false, status: 400, message: 'Invalid Role', error_code: UserManagementErrorCode.INVALID_ROLE }
        }
        const user = await userRepositoryTransaction.updateUserAuthorized(userId, statusTo, roleTo)
        if (!user.success || !user.data) {
            logger.error('User Not Found', 'ChangeUserAuthorizedFromId')
            return { success: false, status: 404, message: 'User Not Found', error_code: UserManagementErrorCode.USER_NOT_FOUND }
        }

        await setUserMetaData(user.data.clerkId, user.data)
        logger.info('Change user status success', 'ChangeUserAuthorizedFromId')
        return { success: true, status: 200, message: 'User status changed successfully', data: user.data }
    } catch {
        return { success: false, status: 500, message: 'Internal Server Error', error_code: UserManagementErrorCode.INTERNAL_ERROR }
    }


}

async function getUserManagement(email?: string, cursor?: string, limit: number = 10): Promise<UserManagementMeta> {
    logger.info('Get user management request', 'getUserManagement')
    try {
        const users = await userRepository.getUserManagement(email, cursor, limit)
        return toUserManagementDto(users, limit)
    } catch {
        logger.error('Internal error in Get user management', 'getUserManagement')
        return { user: [], limit: limit, nextCursor: undefined }
    }
}