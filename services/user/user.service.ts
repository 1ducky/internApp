import { failed } from "@/utils/responseMapper"
import { userDomain } from "./user.domain"
import { userRepositoryTransaction } from "./user.repository"
import { setUserMetaData } from "../clerk/clerk.session"
import { logger } from "@/infrastructure/lib/logger"

export const userService = {
    ChangeUserStatusFromId
}

async function ChangeUserStatusFromId(userId: string, statusTo: string, currentStatus: string) {
    logger.info('Change user status request', 'ChangeUserStatusFromId')
    try {
        if (!userDomain.isUserStatus(statusTo) || !userDomain.isUserStatus(currentStatus)) {
            logger.error('Invalid status Enum', 'ChangeUserStatusFromId')
            return failed(400, 'Invalid status Enum', 'Invalid status Enum')
        }
        if (currentStatus === statusTo) {
            logger.error('User Already in Target Status', 'ChangeUserStatusFromId')
            return failed(400, 'User Already in Target Status', 'User Already in Target Status')
        }
        const user = await userRepositoryTransaction.updateUserStatus(userId, statusTo)
        if (!user.success || !user.data) {
            logger.error('User Not Found', 'ChangeUserStatusFromId')
            return failed(404, 'User Not Found', 'User Not Found')
        }

        await setUserMetaData(user.data.clerkId, user.data)
        logger.info('Change user status success', 'ChangeUserStatusFromId')
        return { success: true, data: user.data }
    } catch {
        return failed(500, 'INTERNAL_ERROR', 'INTERNAL_ERROR')
    }


}