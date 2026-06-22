import { userRole, userStatus } from "./user.domain";
import { UserManagementDTO } from "./user.dto";


export const mockUsers: UserManagementDTO[] = [
    {
        id: "1",
        name: "Alice Admin",
        email: "alice@example.com",
        role: userRole.ADMIN,
        status: userStatus.ACTIVE,
        avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alice",
    },
    {
        id: "2",
        name: "Bob User",
        email: "bob@example.com",
        role: userRole.USER,
        status: userStatus.BANNED,
        // No avatarUrl provided - will fall back to initials
    },
    {
        id: "3",
        name: "Charlie Provider",
        email: "charlie@example.com",
        role: userRole.PROVIDER,
        status: userStatus.ACTIVE,
        avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=Charlie",
    },
    {
        id: "4",
        name: "David Smith",
        email: "david@example.com",
        role: userRole.USER,
        status: userStatus.ACTIVE,
        // No avatarUrl provided - will fall back to initials
    },
    {
        id: "5",
        name: "Eve Banned",
        email: "eve@example.com",
        role: userRole.USER,
        status: userStatus.BANNED,
        avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=Eve",
    },
];
