'use client';

import Image from "next/image";
import { MapPin, Calendar, Briefcase, Award } from "lucide-react";
import { formattedDate } from "@/utils/dateFormateed";
import { ProfilePublicMetadata } from "@/services/profile/profile.dto";


export default function ProfileHeader({ user }: { user: ProfilePublicMetadata }) {
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    };

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-xs">
            {/* Cover Banner with Sleek Gradient */}
            <div className="h-44 sm:h-52 bg-gradient-to-r from-indigo-600 via-purple-650 to-pink-600 relative overflow-hidden">
                {/* Decorative glowing blobs */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 right-10 w-56 h-56 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Profile Info Container */}
            <div className="px-6 pb-6 relative">
                {/* Avatar Wrapper (overlapping banner) */}
                <div className="absolute -top-16 sm:-top-20 left-6">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[3px] shadow-lg shadow-indigo-500/20 transition-transform duration-300 hover:scale-102 hover:rotate-1">
                        <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[21px] flex items-center justify-center p-[3px] overflow-hidden relative">
                            {user.imageUrl ? (
                                <Image
                                    src={user.imageUrl}
                                    alt={user.name}
                                    fill
                                    sizes="(max-width: 640px) 112px, 144px"
                                    className="rounded-[18px] object-cover"
                                />

                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[18px] flex items-center justify-center text-3xl font-extrabold text-white uppercase tracking-wider">
                                    {getInitials(user.name)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Actions Row */}
                {/* <div className="flex justify-end pt-4 h-14 sm:h-16">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/45 text-indigo-600 dark:text-indigo-400 border border-indigo-150/40 dark:border-indigo-900/40 h-fit">
                        <Award size={13} />
                        {user.role}
                    </span>
                </div> */}

                {/* Profile Details */}
                <div className="mt-4">
                    <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-50 leading-tight tracking-tight">
                        {user.name}
                    </h1>
                    <p className="text-sm text-zinc-400 dark:text-zinc-500 font-semibold mt-0.5">
                        @{user.name}
                    </p>

                    {user.bio && (
                        <p className="text-sm sm:text-base text-zinc-650 dark:text-zinc-300 leading-relaxed mt-4 max-w-2xl whitespace-pre-line font-medium">
                            {user.bio}
                        </p>
                    )}

                    {/* Metadata Items */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 pt-5 border-t border-zinc-100 dark:border-zinc-850 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                        <div className="flex items-center gap-1.5 font-medium">
                            <Briefcase size={16} className="text-zinc-400 dark:text-zinc-500" />
                            <span>InternApp Professional</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                            <Calendar size={16} className="text-zinc-400 dark:text-zinc-500" />
                            <span>Bergabung {formattedDate(user.joinAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
