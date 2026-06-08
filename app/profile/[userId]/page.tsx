import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import FeedLayout from "@/component/feed/feed.layout";
import FeedSidebar from "@/component/feed/feed.sidebar";
import FeedLazyLoad from "@/component/feed/feed.lazyload";
import { User } from "lucide-react";
import { ProfileCache } from "@/services/profile/profile.cache";
import { FeedClient } from "@/component/feed/feed.client";
import ProfileHeader from "@/component/profile/profile.header";
import { authService } from "@/services/auth/auth.service";

export async function generateMetadata({ params }: { params: Promise<{ userId: string }> }): Promise<Metadata> {
    const { userId } = await params;
    const resolvedUser = await ProfileCache.publicProfile(userId)()

    if (!resolvedUser?.profile) return {
        title: `Profil Tidak Ditemukan - InternApp`,
        description: `Profil untuk pengguna ini tidak ditemukan.`,
        openGraph: {
            title: `Profil Tidak Ditemukan - InternApp`,
            description: `Profil untuk pengguna ini tidak ditemukan.`,
            images: []
        }
    };

    return {
        title: `${resolvedUser.profile.name} (@${resolvedUser.profile.name}) - Profil InternApp`,
        description: resolvedUser.profile.bio || `Lihat profil ${resolvedUser.profile.name} di InternApp.`,
        openGraph: {
            title: `${resolvedUser.profile.name} - Profil InternApp`,
            description: resolvedUser.profile.bio || `Lihat profil ${resolvedUser.profile.name} di InternApp.`,
            images: resolvedUser.profile.imageUrl ? [resolvedUser.profile.imageUrl] : []
        }
    };
}

export default async function ProfilePage({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    if (!userId) return notFound();

    return (
        <FeedLayout
            sidebar={<FeedSidebar />}
            title={
                <span className="flex items-center gap-2">
                    <User size={20} className="text-indigo-600 dark:text-indigo-400" /> Profil Pengguna
                </span>
            }
            description="Informasi profil pengguna beserta postingan yang telah dipublikasikan"
        >
            <Suspense fallback={<FeedLazyLoad />}>
                <LazyProfileContainer userId={userId} />
            </Suspense>
        </FeedLayout>
    );
}

async function LazyProfileContainer({ userId }: { userId: string }) {
    const [res, viewer] = await Promise.all([ProfileCache.publicProfile(userId)(), authService.getSession()])
    if (!res) return notFound()

    return (
        <>
            <ProfileHeader user={res.profile} />
            <FeedClient initialData={res.posts} viewer={viewer} option={{ userId: userId }} />
        </>
    )

}
