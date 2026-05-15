import { Camera, Info, ChevronDown } from 'lucide-react';

export const UserProfileForm = ({ email }: { email: string }) => {
    return (
        <div className="max-w-7xl h-screen mx-auto p-4 sm:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
                <p className="text-gray-500 text-sm">Manage your name, password and account settings.</p>
            </div>

            <form className="space-y-6">
                {/* Profile Photo */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48">Profile photo</label>
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
                        Full name <Info size={14} className="text-gray-400" />
                    </label>
                    <div className="flex w-full sm:flex-1 gap-0 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                        <input type="text" placeholder="Maria" className="w-1/2 p-2.5 outline-none border-r border-gray-300" />
                        <input type="text" placeholder="Boone" className="w-1/2 p-2.5 outline-none" />
                    </div>
                </div>

                {/* Email */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48">Email</label>
                    <input
                        type="email"
                        placeholder="maria@site.com"
                        className="w-full sm:flex-1 p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Phone */}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48">
                        Phone <span className="text-gray-400 font-normal sm:block sm:text-[10px] md:text-sm">(Optional)</span>
                    </label>
                    <div className="w-full sm:flex-1">
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                            <input type="text" placeholder="+x(xxx)xxx-xx-xx" className="flex-1 p-2.5 outline-none border-r border-gray-300 min-w-0" />
                            <div className="flex items-center px-3 bg-white gap-2 cursor-pointer flex-shrink-0">
                                <span className="text-sm">Mobile</span>
                                <ChevronDown size={16} />
                            </div>
                        </div>
                        <button type="button" className="mt-2 text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline">
                        </button>
                    </div>
                </div>

                {/* Gender */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48">Gender</label>
                    <div className="flex w-full sm:flex-1 border border-gray-300 rounded-lg divide-x divide-gray-300">
                        <label className="flex-1 flex items-center justify-center p-2.5 cursor-pointer hover:bg-gray-50">
                            <input type="radio" name="gender" className="mr-2" defaultChecked /> <span className="text-sm text-gray-500">Laki-laki</span>
                        </label>
                        <label className="flex-1 flex items-center justify-center p-2.5 cursor-pointer hover:bg-gray-50">
                            <input type="radio" name="gender" className="mr-2" /> <span className="text-sm text-gray-500">Perempuan</span>
                        </label>
                    </div>
                </div>

                {/* Bio */}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-20">
                    <label className="text-sm font-medium text-gray-700 sm:w-48">BIO</label>
                    <textarea
                        rows={4}
                        placeholder="Type your message..."
                        className="w-full sm:flex-1 p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-100">
                    <button type="button" className="w-full sm:w-auto px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                        Save changes
                    </button>
                </div>
            </form>
        </div>
    );
};
