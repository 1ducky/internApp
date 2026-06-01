import Link from "next/link";
import { useState } from "react";
import { SocialButtons } from "./SocialMethodBtn";


export default function SignInForm({ action, Error, Loading }: { action: (e: React.FormEvent<HTMLFormElement>) => void, Error?: string, Loading: boolean }) {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    return (
        <>
            <div className="w-full max-w-xl p-5 my-40 bg-white rounded-2xl shadow-2xl mx-auto" >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang Kembali</h2>
                    <p className="text-gray-600">Silakan login untuk melanjutkan</p>
                </div>

                {Error && <p className="text-red-600 text-sm">{Error}</p>}

                <form onSubmit={(e) => action(e)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            <input
                                type="text"
                                name="identifier"
                                id="identifier"
                                required
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors"
                                placeholder="nama@exemple.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                min={8}
                                required
                                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors focus:outline-none"
                                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" /><circle cx="12" cy="12" r="3" /></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <Link href={'/lupa-akun'}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Lupa password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={Loading}
                        className="w-full py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {Loading ? 'Memproses...' : 'Login'}
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-linear-to-b from-blue-50 to-white text-gray-500">Atau lanjutkan dengan</span>
                        </div>
                    </div>

                    <div className="flex flex-row justify-center gap-10">
                        <SocialButtons />
                    </div>

                    <p className="text-center text-gray-600 mt-6">
                        Belum punya akun?{' '}
                        <Link href={'/sign-up'}
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            Daftar sekarang
                        </Link>
                    </p>
                </form>
            </div>
        </>
    )
}