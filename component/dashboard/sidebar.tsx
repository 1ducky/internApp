"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menu = (
    <nav className="flex flex-col gap-4 p-4">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
      >
        <span className="text-xl">👤</span>
        <span>Profile</span>
      </Link>
      <Link
        href="/dashboard/post"
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
      >
        <span className="text-xl">✚</span>
        <span>Post</span>
      </Link>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-20 flex-col items-center bg-blue-600 text-white hover:w-56 transition-all duration-300">
        {menu}
      </aside>

      {/* Mobile top bar */}
      <header className="flex md:hidden items-center justify-between bg-blue-600 px-4 py-2 text-white">
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl"
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <span className="font-semibold">InternApp</span>
      </header>

      {/* Mobile drawer overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/30 md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${open ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:hidden z-50`}
      >
        {menu}
      </aside>
    </>
  );
}
