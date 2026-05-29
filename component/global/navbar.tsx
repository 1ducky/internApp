"use client"

import Link from "next/link"
import { Show, useAuth, UserButton } from "@clerk/nextjs"

export default function Navbar() {
  const { isSignedIn, isLoaded } = useAuth()

  return (
    <header className="w-full border-b bg-white backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight text-black">
          InternApp
        </Link>

        <div className="flex items-center gap-2">
          {isLoaded ? (
            isSignedIn ? (
              <>
                <Link
                  href="/dashboard/post"
                  className="rounded-full border border-black bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-900"
                >
                  +Post
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-full border border-black px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-100"
                >
                  Dashboard
                </Link>
                <Show when="signed-in">
                  <UserButton />
                </Show>
              </>
            ) : (
              <>
                <Show when="signed-out">
                  <Link href="/sign-in" className="rounded-full border border-black bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-900">
                    Login
                  </Link>
                  <Link href="/sign-up" className="rounded-full border border-black bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-900">
                    Sign Up
                  </Link>
                </Show>

              </>
            )
          ) : (
            <div className="h-9 w-24 animate-pulse rounded-full bg-zinc-200" />
          )}
        </div>
      </div>
    </header>
  )
}
