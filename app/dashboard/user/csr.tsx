"use client";

import { useState, useRef } from "react";
import { UserSearchBar } from "./UserSearchBar";
import { ActionBox } from "./ActionBox";
import { userRole, userStatus, TUserRole, TUserStatus } from "@/services/user/user.domain";
import { UserManagementDTO } from "@/services/user/user.dto";
import { TableLayout } from "@/components/table/table.layout";
import Link from "next/link";
import UsermanagementView from "./user.view";
import { useQueryClient } from "@tanstack/react-query";
import { QueryOptions } from "@/utils/queryBuilder";
import { updateUserAuthorizedHook } from "./user.api";
import { useInfiniteObserver, useInfiniteUserQuery } from "./useInfiniteUserQuery";
import { getInitials } from "@/utils/string/getInitial";
import { updateUserCacheClient } from "./user.cache";

export function UserManagementCSR({ initialData, options, limit, nextCursor }: { initialData: UserManagementDTO[], options?: QueryOptions, limit: number, nextCursor?: string }) {
    const observerRef = useRef<HTMLDivElement>(null)
    const [searchQuery, setSearchQuery] = useState("");


    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    const queryClient = useQueryClient()
    const [loadingIds, setLoadingIds] = useState<string[]>([]);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteUserQuery(initialData, limit, { ...options, email: searchQuery }, nextCursor)

    useInfiniteObserver(observerRef, hasNextPage, isFetchingNextPage, () => hasNextPage ?? fetchNextPage())

    const users = data?.pages.flatMap((page) => page.user)

    const handleUpdateAuthorized = async (userId: string, newStatus: TUserStatus, newRole: TUserRole) => {
        setLoadingIds((prev) => [...prev, userId]);
        const validation = users.find((u) => u.id === userId)?.id === userId
        const updateFn = () => updateUserCacheClient(queryClient, userId, { role: newRole, status: newStatus })

        await updateUserAuthorizedHook(userId, newStatus, newRole, (validation ? true : false), updateFn)
        setLoadingIds((prev) => prev.filter((id) => id !== userId));
    }



    const allRoles = Object.values(userRole);

    return (
        <div className="space-y-6">
            {/* Search Component */}
            <UserSearchBar onSearch={handleSearch} isDisable={isFetchingNextPage || loadingIds.length > 0} />

            {/* Data Table */}
            <TableLayout headers={["Name", "Email", "User ID", "Role", "Status", "Actions"]}>
                {users.length > 0 ? (
                    users.map((user) => {
                        return (
                            <UsermanagementView key={user.id} user={user} initialName={getInitials(user.name)} isLoading={loadingIds.includes(user.id)} ActionBox={
                                <ActionBox>
                                    <Link href={`/profile/${user.id}`} prefetch={false} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                        View Profile
                                    </Link>
                                    <button disabled={loadingIds.includes(user.id)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                        Reset Password
                                    </button>
                                    {/* Divider */}
                                    <div className="border-t border-gray-100 my-1"></div>

                                    {user.status === userStatus.ACTIVE ? (
                                        <button disabled={loadingIds.includes(user.id)}
                                            onClick={() => handleUpdateAuthorized(user.id, userStatus.BANNED, user.role)}
                                            className="block w-full text-left px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                                        >
                                            Ban User
                                        </button>
                                    ) : user.status === userStatus.BANNED ? (
                                        <button disabled={loadingIds.includes(user.id)}
                                            onClick={() => handleUpdateAuthorized(user.id, userStatus.ACTIVE, user.role)}
                                            className="block w-full text-left px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                                        >
                                            Unban User
                                        </button>
                                    ) : null}
                                </ActionBox>
                            } roleSelect={
                                <select
                                    value={user.role}
                                    onChange={(e) => handleUpdateAuthorized(user.id, user.status, e.target.value as TUserRole)}
                                    disabled={loadingIds.includes(user.id)}
                                    className={`text-sm border-gray-200 rounded-lg text-slate-700 bg-slate-50 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none py-1.5 px-3 border transition-all cursor-pointer ${loadingIds.includes(user.id) ? "opacity-50 pointer-events-none" : ""
                                        }`}
                                >
                                    {allRoles.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            } />
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-sm">
                            <div className="flex flex-col items-center justify-center">
                                <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                                <p className="text-gray-500 font-medium">User Tidak Ditemukan</p>
                                <button
                                    onClick={() => handleSearch("")}
                                    className="mt-2 text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    Hapus Pencarian
                                </button>
                            </div>
                        </td>
                    </tr>
                )}
                <tr>
                    <td colSpan={6} className="px-6">
                        {hasNextPage ? (
                            <div ref={observerRef} className="py-4 flex items-center justify-center w-full">
                                {isFetchingNextPage && <p className="text-sm text-zinc-500">Memuat...</p>}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center py-4 w-full">
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Tidak ada user lagi</p>
                            </div>
                        )}
                    </td>
                </tr>

            </TableLayout>

        </div>
    );
}