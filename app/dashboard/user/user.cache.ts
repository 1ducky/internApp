import { UserManagementDTO, UserManagementMeta } from "@/services/user/user.dto"
import { InfiniteData, QueryClient } from "@tanstack/react-query"

export function updateUserCacheClient(
    queryClient: QueryClient,
    userId: string,
    updates: Partial<UserManagementDTO>
) {
    queryClient.setQueriesData<InfiniteData<UserManagementMeta>>(
        { queryKey: ['users'], exact: false },
        (oldData) => {
            if (!oldData) return oldData
            return {
                ...oldData,
                pages: oldData.pages.map((page) => ({
                    ...page,
                    user: page.user.map((u) =>
                        u.id === userId ? { ...u, ...updates } : u
                    ),
                })),
            }
        }
    )
}