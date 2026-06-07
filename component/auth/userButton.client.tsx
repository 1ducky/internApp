'use client'

import { useState, useRef, useEffect } from "react"
import { ClerkSession } from "@/services/clerk/clerk.session"
import Image from "next/image"

export const UserButtonClient = ({ user, children }: { user: ClerkSession, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 overflow-hidden border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform hover:scale-105"
            >
                {user.img ? (
                    <Image fill sizes="32px,32px" src={user.img} alt={user.name || "User"} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-sm font-semibold">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 min-w-[200px] bg-white rounded-xl shadow-lg py-1 z-50 border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800 animate-in fade-in slide-in-from-top-2">
                    {children}
                </div>
            )}
        </div>
    )
}
