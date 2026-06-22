import { userCache } from "@/services/user/user.cache";
import { UserManagementCSR } from "./csr";
import { AuthGuard } from "@/services/auth/auth.helper";
import { forbidden, unauthorized } from "next/navigation";


export default async function UserManagement() {
    await AuthGuard({ role: ['ADMIN'], permissions: ['user:management', 'user:banning', 'user:unbanning', 'user:update'], status: 'ACTIVE', onUnauthorized: unauthorized, onForbidden: forbidden })
    // if (!auth.success || !auth.data) return unauthorized();
    const limit = 10

    const initialUsers = await userCache.userManagementCache(limit, undefined, undefined)()

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto w-full min-h-screen bg-gray-50/50">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Search, manage roles, and control access for all platform users.
                </p>
            </div>

            <UserManagementCSR initialData={initialUsers.user} limit={limit} nextCursor={initialUsers.nextCursor} />
        </div>
    );
}