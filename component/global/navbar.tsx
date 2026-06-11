

import Link from "next/link"
import { Show } from "@clerk/nextjs"
import { AccountButton } from "../auth/userButton"
import Image from "next/image"

export default function Navbar() {

  return (
    <header className="w-full border-b bg-white backdrop-blur-md shadow-sm z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight text-black flex items-center gap-2">
          <div className="relative w-10 h-10">
            <Image src="/icon.svg" alt="InternApp" fill sizes="40px" className="inline object-contain" />
          </div>
          InternApp
        </Link>

        <div className="flex items-center gap-2">
          <Show when={'signed-in'}>
            <Link
              href="/dashboard/post"
              className="rounded-full border border-black bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-900"
            >
              Post
            </Link>
            <AccountButton />
          </Show>

          <Show when={'signed-out'}>
            <Link
              href="/sign-in"
              className="rounded-full border border-black bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-900"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full border border-black bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-900"
            >
              Sign Up
            </Link>
          </Show>
        </div>
      </div>
    </header>
  )
}
