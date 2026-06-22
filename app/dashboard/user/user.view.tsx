import { TableData } from "@/components/table/table.data";
import { TableItem } from "@/components/table/table.item";
import { userStatus } from "@/services/user/user.domain";
import { UserManagementDTO } from "@/services/user/user.dto";
import { Loader } from "lucide-react";
import Image from "next/image";

export default function UsermanagementView({ user, initialName, roleSelect, isLoading, ActionBox }: { user: UserManagementDTO, initialName: string, roleSelect: React.ReactNode, isLoading: boolean, ActionBox: React.ReactNode }) {
    return (
        <>
            <TableItem key={user.id}>
                <TableData>
                    <div className="flex items-center gap-3">
                        {user.avatarUrl ? (
                            <Image
                                src={user.avatarUrl}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover bg-gray-50 border border-gray-100"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold border border-slate-200">
                                {initialName}
                            </div>
                        )}
                        <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                    </div>
                </TableData>
                <TableData>
                    <div className="text-sm text-gray-500">{user.email}</div>
                </TableData>
                <TableData>
                    <div className="text-sm text-gray-400 font-mono">{user.id}</div>
                </TableData>
                <TableData>
                    {roleSelect}
                    {isLoading && <Loader size={20} className="animate-spin " />}
                </TableData>
                <TableData>
                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide capitalize transition-opacity duration-300
                                            ${user.status === userStatus.ACTIVE
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                : user.status === userStatus.BANNED
                                    ? "bg-rose-50 text-rose-600 border border-rose-100"
                                    : "bg-slate-50 text-slate-600 border border-slate-200"
                            }
                                            ${isLoading ? "opacity-50" : "opacity-100"}
                                        `}
                    >
                        {user.status.toLowerCase()}
                        {isLoading && <Loader size={20} className="animate-spin " />}
                    </span>
                </TableData>
                <TableData>
                    {ActionBox}
                </TableData>
            </TableItem>
        </>
    )
}