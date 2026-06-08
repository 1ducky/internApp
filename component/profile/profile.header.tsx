'use client';

import Image from "next/image";
import { Calendar, Briefcase, User } from "lucide-react";
import { ProfilePublicMetadata } from "@/services/profile/profile.dto";

export default function ProfileHeader({ user }: { user: ProfilePublicMetadata }) {
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    };

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-xs">

            {/* ── Cover Banner ── */}
            <div className="h-32 sm:h-44 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 right-10 w-56 h-56 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-6 right-6 opacity-20">
                    <div className="w-16 h-16 border-2 border-white/40 rounded-full" />
                    <div className="w-8 h-8 border-2 border-white/30 rounded-full absolute -top-2 right-10" />
                </div>
            </div>

            {/* ── Profile Info Container ── */}
            <div className="px-4 sm:px-6 pb-5 sm:pb-6">

                {/* ── Avatar + Name Row ── */}
                {/* Mobile: avatar naik ke atas, nama di sebelah kanan avatar */}
                {/* Desktop: avatar lebih besar, nama & username sejajar bawah */}
                <div className="flex flex-row items-end gap-3 sm:gap-4 -mt-10 sm:-mt-14">

                    {/* Avatar */}
                    <div className="shrink-0">
                        <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl sm:rounded-3xl bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[3px] shadow-lg shadow-indigo-500/25 transition-transform duration-300 hover:scale-[1.03] hover:rotate-1">
                            <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[13px] sm:rounded-[21px] flex items-center justify-center overflow-hidden relative">
                                {user.imageUrl ? (
                                    <Image
                                        src={user.imageUrl}
                                        alt={user.name}
                                        fill
                                        sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 128px"
                                        className="rounded-[10px] sm:rounded-[18px] object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-linear-to-br from-indigo-500 to-purple-600 rounded-[10px] sm:rounded-[18px] flex items-center justify-center text-xl sm:text-3xl font-extrabold text-white tracking-wider">
                                        {getInitials(user.name)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Name & Username */}
                    <div className="min-w-0 pb-1 flex-1">
                        <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-50 leading-tight wrap-break-words">
                            {user.name}
                        </h1>
                        <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 font-semibold mt-0.5 truncate">
                            @{user.name.toLowerCase().replace(/\s+/g, '')}
                        </p>
                    </div>
                </div>

                {/* ── Bio ── */}
                <div className="mt-4">
                    {user.bio && user.bio !== 'Belum Mengisi Biodatara' ? (
                        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl whitespace-pre-line font-medium">
                            {user.bio}
                        </p>
                    ) : (
                        <p className="text-sm text-zinc-400 dark:text-zinc-600 italic flex items-center gap-1.5">
                            <User size={14} />
                            Belum ada bio
                        </p>
                    )}
                </div>

                {/* ── Metadata Strip ── */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">

                    <MetaBadge icon={<Briefcase size={13} />} label="InternApp Professional" />
                    <MetaBadge icon={<Calendar size={13} />} label={`Bergabung ${user.joinAt}`} />

                </div>
            </div>
        </div>
    );
}

/* ── small helper component ── */
function MetaBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/60 px-2.5 py-1 rounded-full border border-zinc-100 dark:border-zinc-700/60">
            <span className="text-zinc-400 dark:text-zinc-500 shrink-0">{icon}</span>
            <span className="whitespace-nowrap">{label}</span>
        </div>
    );
}
