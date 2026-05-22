'use client'

import PostLayout from "@/component/post/layout"
import InstagramPost from "@/component/post/postComponent"
import { useConfirm } from "@/provider/comfirm-provider"
import { PostDto } from "@/services/post/post.dto"
import { PenBoxIcon, Trash } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function PostPageClient({data}: {data: PostDto[]}) {
    const confirm = useConfirm()
    const [post,setPost] = useState<PostDto[]>(data || [])

    const handleDelete = async (id: string) => {
        const ok = await confirm({
            actionLabel: "Hapus",
            title: "Yakin ingin menghapus postingan?",
            description: "Tindakan ini tidak dapat dibatalkan atau lebih baik draf Postingan saja jika tidak ingin dipublikasikan",
            consequences:['Postingan akan dihapus secara permanen','Semua data terkait postingan akan hilang'],
        })
        if(!ok) return
        try{
            const res = await fetch(`/api/post/${id}`, {
                method: "DELETE",
            })
            if(res.status === 200){
                // Berhasil dihapus, lakukan sesuatu seperti refresh data atau tampilkan notifikasi
                console.log('Post deleted successfully')
                setPost(prev => prev.filter(item => item.id !== id))
            } else {
                console.log('Failed to delete post')
                console.log(res)
            }
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
            <PostLayout>
                {
                    post ? post.map((item) => {
                        return (
                            <li key={item.id}>
                                <InstagramPost post={item}>
                                    <Link href={`/dashboard/post/edit/${item.id}`}><PenBoxIcon size={20}/></Link>
                                    <button onClick={() => handleDelete(item.id)}><Trash size={20}/></button>
                                </InstagramPost>
                            </li>
                        )
                    }) : <div className="text-center text-gray-500 py-10">Belum ada postingan, buat yang pertama!</div>

                }
                {
                    post && post.length === 0 && <div className="text-center text-gray-500 py-10">Belum ada postingan, buat yang pertama!</div>
                    }
            </PostLayout>
        </>
    )
}