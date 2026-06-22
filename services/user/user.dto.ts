import { TUserRole, TUserStatus } from "./user.domain";
import { userRepository } from "./user.repository";

export interface UserManagementDTO {
    id: string;
    name: string;
    email: string;
    role: TUserRole;
    status: TUserStatus;
    avatarUrl?: string;
}

export interface UserManagementUpdateDTO {
    id: string
    role: TUserRole;
    status: TUserStatus;
}

export type UserManagementMeta = {
    user: UserManagementDTO[];
    limit?: number;
    nextCursor?: string;
}

export enum UserManagementErrorCode {
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    INVALID_ROLE = 'INVALID_ROLE',
    INVALID_STATUS = 'INVALID_STATUS',
    INVALID_PERMISSION = 'INVALID_PERMISSION',
    INTERNAL_ERROR = 'INTERNAL_ERROR'
}

export type UserUpdateMeta = {
    id: string
    role: TUserRole
    status: TUserStatus
}

export type ResponseUpdateUserDTO = {
    success: true;
    status: 200
    message: string;
    data?: UserUpdateMeta;
} | {
    success: false;
    status: number;
    error_code: UserManagementErrorCode
    message: string;
}

type rawUserManagement = Awaited<ReturnType<typeof userRepository.getUserManagement>>

export const toUserManagementDto = (user: rawUserManagement, limit: number): UserManagementMeta => {
    if (!user.success || !user.data) {
        return { user: [], limit: limit, nextCursor: undefined }
    }
    const userData: UserManagementDTO[] = user.data.map((item) => {
        return {
            id: item.id,
            name: item.name ?? '',
            email: item.email ?? '',
            role: item.role,
            status: item.status,
            avatarUrl: item.imageUrl ?? undefined
        }
    })

    return {
        user: userData,
        limit: limit,
        nextCursor: user.data[user.data.length - 1]?.id ?? undefined
    }
}

