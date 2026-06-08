import { toFeedDto } from "../feed/feed.dto";
import { profileRepository } from "./profile.repository";

export type RawPublicProfile = Awaited<ReturnType<typeof profileRepository.getPublicProfileById>>;

export type ProfilePublicMetadata = {
    name: string;
    imageUrl: string;
    joinAt: string;
    bio: string
}

export const toPublicProfileDto = (rawProfile: RawPublicProfile) => {
    if (!rawProfile || !rawProfile.success || !rawProfile.data) return null
    const profile: ProfilePublicMetadata = {
        name: rawProfile.data.name ?? rawProfile.data.profile?.userName ?? 'Belum Mengisi Biodatara',
        joinAt: rawProfile.data.createdAt.toLocaleString('id-ID') ?? '',
        imageUrl: rawProfile.data.imageUrl ?? '',
        bio: rawProfile.data.profile?.bio ?? 'Belum Mengisi Biodatara'
    }
    const posts = toFeedDto(rawProfile.data.post)

    return {
        profile,
        posts
    }
}

export type PublicProfileDto = ReturnType<typeof toPublicProfileDto>