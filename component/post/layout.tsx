"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
    Plus,
    ArrowUpDown,
    ChevronDown,
    Grid,
    List,
    Search,
    X,
    Check,
    RotateCcw,
} from "lucide-react";

export default function PostLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Active state from query params (fallback to default)
    const activeCategory = searchParams.get("category") || "all";
    const activeSort = searchParams.get("sort") || "desc"; // desc = terbaru, asc = terlama
    const activeSearch = searchParams.get("q") || "";
    const activeView = searchParams.get("view") || "grid";

    const [isSortOpen, setIsSortOpen] = useState(false);
    const [searchValue, setSearchValue] = useState(activeSearch);

    // Helper to construct query strings elegantly
    const updateQueryParam = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (!value || value === "all" || value === "") {
            params.delete(name);
        } else {
            params.set(name, value);
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateQueryParam("q", searchValue);
    };

    const handleResetFilters = () => {
        setSearchValue("");
        router.push(pathname); // resets all search parameters
    };

    // Determine if any filters are active
    const isFiltered = activeCategory !== "all" || activeSearch !== "" || activeSort !== "desc";

    return (
        <div className="min-h-screen  font-sans antialiased transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Unified Control Toolbar (Minimalist & Dynamic UX) */}
                <div className="flex flex-col gap-4 mb-6">


                    {/* Bottom Row: Actions (Search, Sort, View Layout, Clear Filter) */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        {/* Search Input Box */}
                        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Cari artikel berdasarkan judul..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="w-full h-10 pl-9 pr-8 text-sm rounded-xl border  transition-all"
                            />
                            {searchValue ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchValue("");
                                        updateQueryParam("q", "");
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-zinc-600 dark:text-zinc-505 dark:hover:text-zinc-350 transition-colors cursor-pointer"
                                    title="Bersihkan pencarian"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider"
                                    title="Tekan Enter untuk mencari"
                                >
                                    Cari
                                </button>
                            )}
                        </form>

                        {/* Right side: Sorting, View Toggle, and Reset */}
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                            {/* Reset Filter Button */}
                            {isFiltered && (
                                <button
                                    onClick={handleResetFilters}
                                    className="inline-flex h-10 items-center gap-1.5 px-3 rounded-xl border border-dashed border-zinc-200 text-xs font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition-all cursor-pointer"
                                    title="Reset semua filter ke default"
                                >
                                    <RotateCcw className="h-3 w-3" />
                                    <span>Atur Ulang</span>
                                </button>
                            )}

                            <div className="flex items-center gap-3">
                                <Link
                                    href="/dashboard/post/new"
                                    className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 text-sm font-medium text-zinc-50 shadow-sm transition-all hover:bg-zinc-800 hover:shadow active:scale-98 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-100"
                                    title="Buat artikel atau pengumuman baru"
                                >
                                    <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                                    <span>Buat Postingan</span>
                                </Link>
                            </div>

                            {/* Sorting Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="inline-flex h-10 items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-4 text-xs font-medium text-zinc-700 shadow-sm hover:bg-zinc-700 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-850 transition-all cursor-pointer"
                                    title="Urutkan postingan"
                                >
                                    <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-505" />
                                    <span>
                                        {activeSort === "desc" ? "Terbaru" : "Terlama"}
                                    </span>
                                    <ChevronDown className={`h-3 w-3 text-zinc-400 transition-transform duration-250 ${isSortOpen ? "rotate-180" : ""}`} />
                                </button>

                                {isSortOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsSortOpen(false)}
                                        />
                                        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl border border-zinc-200 bg-white p-1 shadow-lg ring-1 ring-black/5 z-20 dark:border-zinc-800 dark:bg-zinc-900 transition-all">
                                            <button
                                                onClick={() => {
                                                    updateQueryParam("sort", "desc");
                                                    setIsSortOpen(false);
                                                }}
                                                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
                                            >
                                                <span>Terbaru</span>
                                                {activeSort === "desc" && <Check className="h-3.5 w-3.5 text-zinc-900 dark:text-zinc-50" />}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    updateQueryParam("sort", "asc");
                                                    setIsSortOpen(false);
                                                }}
                                                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
                                            >
                                                <span>Terlama</span>
                                                {activeSort === "asc" && <Check className="h-3.5 w-3.5 text-zinc-900 dark:text-zinc-50" />}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* View Layout Toggle (Grid vs List) */}
                            <div className="flex items-center gap-0.5 rounded-xl border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900" title="Ubah tata letak">
                                <button
                                    onClick={() => updateQueryParam("view", "grid")}
                                    className={`rounded-lg p-1.5 transition-all cursor-pointer ${activeView === "grid"
                                        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                                        : "text-zinc-400 hover:text-zinc-750 dark:text-zinc-505 dark:hover:text-zinc-300"
                                        }`}
                                    title="Mode Grid (Kotak)"
                                >
                                    <Grid className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    onClick={() => updateQueryParam("view", "list")}
                                    className={`rounded-lg p-1.5 transition-all cursor-pointer ${activeView === "list"
                                        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                                        : "text-zinc-400 hover:text-zinc-750 dark:text-zinc-505 dark:hover:text-zinc-300"
                                        }`}
                                    title="Mode List (Daftar)"
                                >
                                    <List className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Children Render Area */}
                <div className="relative min-h-[450px] rounded-3xl p-6 shadow-xs sm:p-8 transition-colors duration-350">
                    {children}
                </div>

            </div>
        </div>
    );
}