'use client'

import { ProfileInput, ProfileSchema } from '@/services/profile/profile.schema';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';


export const UserProfileForm = ({ action, email, profileData }: { action: (e: unknown) => void, email: string, profileData: ProfileInput | null }) => {
    const { user } = useUser()
    function formatNumber(num: string) {

        const sanitized = num.replace(/\D/g, '');
        return sanitized.match(/.{1,4}/g)?.join('-') ?? '';
    }


    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) {
            e.target.value = '';
            return;
        };

        try {
            await user.setProfileImage({ file });
            await user.reload();
        } catch (error) {
            console.error("Gagal upload gambar:", error);
        }
    };
    const form = useForm<ProfileInput>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            userName: profileData?.userName ?? '',
            phoneNumber: formatNumber(profileData?.phoneNumber ?? ''),
            birthDate: profileData?.birthDate ?? '',
            gender: profileData?.gender ?? 'BOY',
            bio: profileData?.bio ?? '',
            location: profileData?.location ?? '',
        }
    })

    const onSubmited = form.handleSubmit(async (values) => {
        await action(values)
        form.reset(values)
    })

    return (
        <div className="max-w-7xl mx-auto p-4 md:mb-5 sm:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Profil</h2>
                <p className="text-gray-500 text-sm">Atur Informasi diri Anda</p>
            </div>

            <form className="space-y-6" onSubmit={onSubmited}>
                {/* Profile Photo */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48">Foto Profil</label>
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center shrink-0 relative" onClick={handleUploadClick}>
                            <input type="file" name="image" id="image" ref={fileInputRef} className="hidden w-0 h-0" accept='image/*' onChange={handleImageChange} />
                            {user?.imageUrl ? (
                                <Image src={user.imageUrl} fill sizes='80px' alt="Profile" className="rounded-full object-cover" />
                            ) : (
                                <span className="text-gray-400 text-2xl">👤</span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">{email}</p>
                    </div>
                </div>

                {/* Full Name */}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48 flex items-center gap-1">
                        Nama Lengkap <Info size={14} className="text-gray-400" />
                    </label>
                    <div className="flex w-full sm:flex-1 gap-0 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                        <input type="text" {...form.register("userName")} placeholder="Maria" className="capitalize w-full p-2.5 outline-none border-r border-gray-300" />
                    </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48">
                        No Tlp Pribadi <span className="text-gray-400 font-normal sm:block sm:text-[10px] md:text-sm">(Opsional)</span>
                    </label>
                    <div className="w-full sm:flex-1">
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                            <input type="text" {...form.register("phoneNumber")} onBlur={(e) => e.target.value = formatNumber(e.target.value)} placeholder="xxxx-xxxx-xxxx (Auto Format)" className="flex-1 p-2.5 outline-none border-r border-gray-300 min-w-0" />
                        </div>
                        <button type="button" className="mt-2 text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline">
                        </button>
                    </div>
                </div>
                {/* Location*/}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48">
                        Lokasi <span className="text-gray-400 font-normal sm:block sm:text-[10px] md:text-sm">(Opsional)</span>
                    </label>
                    <div className="w-full sm:flex-1">
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                            <input type="text" {...form.register("location")} placeholder="City, Country" className="flex-1 p-2.5 outline-none border-r border-gray-300 min-w-0" />
                            <div className="flex items-center px-3 bg-white gap-2 cursor-pointer shrink-0">
                                <MapPin size={16} className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Birthday */}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48">
                        Tanggal Lahir <span className="text-gray-400 font-normal sm:block sm:text-[10px] md:text-sm">(Opsional)</span>
                    </label>
                    <div className="w-full sm:flex-1">
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                            <input type="date" {...form.register("birthDate")} className="flex-1 p-2.5 outline-none border-r border-gray-300 min-w-0" />

                        </div>
                    </div>
                </div>

                {/* Gender */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48">Jenis Kelamin</label>
                    <div className="flex w-full sm:flex-1 border border-gray-300 rounded-lg divide-x divide-gray-300">
                        <label className="flex-1 flex items-center justify-center p-2.5 cursor-pointer hover:bg-gray-50">
                            <input type="radio" {...form.register("gender")} value="BOY" className="mr-2" /> <span className="text-sm text-gray-500">Laki-laki</span>
                        </label>
                        <label className="flex-1 flex items-center justify-center p-2.5 cursor-pointer hover:bg-gray-50">
                            <input type="radio" {...form.register("gender")} value="GIRL" className="mr-2" /> <span className="text-sm text-gray-500">Perempuan</span>
                        </label>
                    </div>
                </div>

                {/* Bio */}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48">BIO</label>
                    <textarea
                        rows={4}
                        {...form.register("bio")}
                        placeholder="Masukan Bio Data Ando..."
                        className="w-full sm:flex-1 p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-100">
                    <button type="button" className="w-full sm:w-auto px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Batal
                    </button>
                    <input disabled={!form.formState.isDirty || form.formState.isSubmitting} type="submit" className={`w-full sm:w-auto px-5 py-2 text-white rounded-lg text-sm font-medium transition ${form.formState.isSubmitting || !form.formState.isDirty ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`} value={form.formState.isSubmitting ? "Processing..." : "Save Changes"} />
                </div>
            </form>
        </div>
    );
};
