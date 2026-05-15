'use client'

import { Info, MapPin } from 'lucide-react';

export const UserProfileForm = ({ action, email }: { action: (e: React.FormEvent<HTMLFormElement>) => void, email: string }) => {
    function formatNumber(inputEl: React.ChangeEvent<HTMLInputElement>) {
        const input = inputEl.target;
        const sanitized = input.value.replace(/\D/g, '');
        input.value = sanitized.match(/.{1,4}/g)?.join('-') ?? '';
    }
    return (
        <div className="max-w-7xl h-screen mx-auto p-4 sm:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Profil</h2>
                <p className="text-gray-500 text-sm">Atur Informasi diri Anda</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => action(e)}>
                {/* Profile Photo */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48">Foto Profil</label>
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-400 text-2xl">👤</span>
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
                        <input type="text" placeholder="Maria" name="name" className="capitalize w-full p-2.5 outline-none border-r border-gray-300" />
                    </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48">
                        No Tlp Pribadi <span className="text-gray-400 font-normal sm:block sm:text-[10px] md:text-sm">(Opsional)</span>
                    </label>
                    <div className="w-full sm:flex-1">
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                            <input onBlur={(e) => formatNumber(e)} type="text" name='phoneNumber' placeholder="xxxx-xxxx-xxxx (Auto Format)" className="flex-1 p-2.5 outline-none border-r border-gray-300 min-w-0" />
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
                            <input type="text" name="location" placeholder="City, Country" className="flex-1 p-2.5 outline-none border-r border-gray-300 min-w-0" />
                            <div className="flex items-center px-3 bg-white gap-2 cursor-pointer flex-shrink-0">
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
                            <input type="date" name="birthDate" className="flex-1 p-2.5 outline-none border-r border-gray-300 min-w-0" />

                        </div>
                    </div>
                </div>

                {/* Gender */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48">Jenis Kelamin</label>
                    <div className="flex w-full sm:flex-1 border border-gray-300 rounded-lg divide-x divide-gray-300">
                        <label className="flex-1 flex items-center justify-center p-2.5 cursor-pointer hover:bg-gray-50">
                            <input type="radio" name="gender" value="BOY" className="mr-2" defaultChecked /> <span className="text-sm text-gray-500">Laki-laki</span>
                        </label>
                        <label className="flex-1 flex items-center justify-center p-2.5 cursor-pointer hover:bg-gray-50">
                            <input type="radio" name="gender" value="GIRL" className="mr-2" /> <span className="text-sm text-gray-500">Perempuan</span>
                        </label>
                    </div>
                </div>

                {/* Bio */}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48">BIO</label>
                    <textarea
                        rows={4}
                        name='bio'
                        placeholder="Masukan Bio Data Ando..."
                        className="w-full sm:flex-1 p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-100">
                    <button type="button" className="w-full sm:w-auto px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Batal
                    </button>
                    <input type="submit" className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition" value="Simpan Perubahan" />
                </div>
            </form>
        </div>
    );
};
