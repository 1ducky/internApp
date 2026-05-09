import { SignUpData } from "../../services/auth/signup.schema";
import Link from "next/link";
// import SocialButtons from "../SocialMethodBtn"
import { useState } from "react";
import { SocialButtons } from "./SocialMethodBtn";

export function SignUpForm({ action, Loading, Errors, Message, children }: { action: (e: React.FormEvent<HTMLFormElement>) => void, Loading: boolean, Errors?: SignUpData, Message?: string, children?: React.ReactNode }) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [pass, setPass] = useState<string>("");
  const [passConfirm, setPassConfirm] = useState<string>("");

  const isDisabled = pass === "" || passConfirm === "" || pass !== passConfirm;
  const isSame = pass === passConfirm;
  return (
    <div className="w-full max-w-xl w-min-md mx-auto my-32 p-10 bg-white shadow-2xl rounded-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Buat Akun Baru
        </h2>
        <p className="text-gray-600">Bergabunglah dengan kami hari ini</p>
      </div>
      {Message && <p className="text-green-600 text-xs mt-1">{Message}</p>}

      <form onSubmit={(e) => action(e)} className="space-y-5">

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nama Pengguna
          </label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <input
              className={`w-full pl-12 pr-4 py-3 border-2 ${Errors?.name ? 'border-red-400' : 'border-gray-200'} rounded-xl focus:border-blue-400 focus:outline-none transition-colors`}
              type="text"
              name="name"
              id="name"
              placeholder="Budi Setiawan"

            />
          </div>
          {Errors?.name && <p className="text-red-600 text-xs mt-1">{Errors.name[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <input
              type="email"
              name="email"
              id="email"

              className={`w-full pl-12 pr-4 py-3 border-2 ${Errors?.email ? 'border-red-400' : 'border-gray-200'} rounded-xl focus:border-blue-400 focus:outline-none transition-colors`}
              placeholder="nama@exemple.com"
            />
          </div>
          {Errors?.email && <p className="text-red-600 text-xs mt-1">{Errors.email[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full pl-12 pr-12 py-3 border-2 ${Errors?.password ? 'border-red-400' : 'border-gray-200'} rounded-xl focus:border-blue-400 focus:outline-none transition-colors`}
              placeholder="Min. 8 karakter"
              name="password"
              id="password"
              min={8}

              onChange={(e) => setPass(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors focus:outline-none"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
          {Errors?.password && <p className="text-red-600 text-xs mt-1">{Errors.password[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Konfirmasi Password
          </label>
          {!isSame && (
            <label className="block text-sm font-semibold text-red-700 mb-2">
              Password Tidak Sama
            </label>
          )}
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors"
              placeholder="Ulangi password"
              name="confirm"
              id="confirm"
              min={8}

              onChange={(e) => setPassConfirm(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors focus:outline-none"
              aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
        </div>

        {children}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"

              className="w-5 h-5 rounded border-gray-300 mt-0.5"
            />
            <span className="text-sm text-gray-700">
              Saya menyetujui{" "}
              <Link
                href={"#"}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Syarat & Ketentuan
              </Link>{" "}
              dan{" "}
              <Link
                href={"#"}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Kebijakan Privasi
              </Link>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={Loading || isDisabled}
          className="w-full py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {Loading ? "Memproses..." : "Daftar"}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-linear-to-b from-blue-50 to-white text-gray-500">
              Atau daftar dengan
            </span>
          </div>
        </div>

        <div className="flex flex-row justify-center gap-10">
          <SocialButtons />
        </div>

        <p className="text-center text-gray-600 mt-6">
          Sudah punya akun?{" "}
          <Link
            href={"/sign-in"}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Login di sini
          </Link>
        </p>
      </form>
    </div>
  );
}
