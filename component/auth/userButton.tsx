import { authService } from "@/services/auth/auth.service";
import { UserButtonClient } from "./userButton.client";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export async function AccountButton({ children }: { children?: React.ReactNode }) {
    const user = await authService.getSession()

    if (!user) return null

    return (
        <UserButtonClient user={user}>
            {children ? children : (
                <div className="flex flex-col py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-zinc-800 mb-1">
                        <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">{user.name || "User"}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>

                    <Link href="/dashboard" className="text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-zinc-800 transition-colors w-full">
                        Profil Saya
                    </Link>

                    <div className="border-t border-gray-100 dark:border-zinc-800 mt-1 pt-1">
                        <div className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors cursor-pointer w-full text-left">
                            <SignOutButton>
                                <button className="w-full text-left">Keluar</button>
                            </SignOutButton>
                        </div>
                    </div>
                </div>
            )}
        </UserButtonClient>
    )
}