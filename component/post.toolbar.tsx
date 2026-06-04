'use client'

import { Plus, ArrowDownUp } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'

export function PostToolbar() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentOrder = searchParams.get('orderBy') || 'desc'

    const handleOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        const params = new URLSearchParams(searchParams.toString())
        params.set('orderBy', value)
        router.push(`?${params.toString()}`)
    }

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 mb-6 gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <ArrowDownUp size={18} className="text-zinc-500" />
                <select
                    value={currentOrder}
                    onChange={handleOrderChange}
                    className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none transition-all cursor-pointer"
                >
                    <option value="desc">Terbaru</option>
                    <option value="asc">Terlama</option>
                </select>
            </div>

            <Link
                href="/dashboard/post/new"
                prefetch={false}
                className="w-full sm:w-auto flex items-center justify-center gap-2 dark:bg-zinc-300 dark:text-zinc-900 dark:hover:bg-zinc-400 dark:hover:text-zinc-300 bg-zinc-600 hover:bg-zinc-500 hover:text-zinc-900 text-zinc-800 font-medium py-2.5 px-5 rounded-lg transition-colors"
            >
                <Plus size={18} />
                <span>Buat Post</span>
            </Link>
        </div>
    )
}
