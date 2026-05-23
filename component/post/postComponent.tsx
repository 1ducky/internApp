'use client'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Calendar } from 'lucide-react';
import { PostDto } from '@/services/post/post.dto';
import ImagePreview from '../objectStore/image.preview';

const InstagramPost = ({ post,children }: { post: PostDto, children:React.ReactNode }) => {
    // Format tanggal agar lebih rapi (Contoh: May 19, 2026)
    const formattedDate = new Date(post.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }) ;

    return (
        <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden my-4 shadow-sm font-sans">

            {/* HEADER POSTINGAN */}
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    {/* Avatar (Placeholder) */}
                    <div className="w-9 h-9 rounded-full bg-linear-to-tr from-yellow-500 to-purple-600 p-0.5">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-0.5">
                            <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                Admin
                            </div>
                        </div>
                    </div>
                    {/* Username & Status */}
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm hover:underline cursor-pointer">system_hub</span>
                            {/* Badge Status */}
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${post.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                {post.status}
                            </span>
                        </div>
                        <span className="text-xs text-gray-500">{post.slug}</span>
                    </div>
                </div>
                {/* Tombol Opsi */}
                <div className="text-gray-600 hover:text-black transition flex gap-3">
                    <MoreHorizontal size={20} />
                    {children}
                </div>
            </div>

            {/* AREA KONTEN UTAMA (Pengganti Gambar Instagram) */}
            <div className="bg-linear-to-br from-indigo-900 via-purple-800 to-pink-700 p-8 min-h-62.5 flex flex-col justify-between text-white relative">
                    {post.assets && post.assets.map((item,index) => {
                        return(
                            <div key={post.id + index}>
                                <ImagePreview url={item.fileUrl}/>
                            </div>
                        )
                    })}
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    📢 {post.type}
                </div>

                {/* Judul Utama */}
                <div className="my-auto">
                    <h2 className="text-2xl font-bold tracking-tight leading-tight line-clamp-3">
                        {post.title}
                    </h2>
                </div>

                {/* ID Informasi Kecil di bawah */}
                <div className="text-[10px] text-white/60 font-mono">
                    ID: {post.id}
                </div>
            </div>

            {/* ACTION BAR (Like, Comment, Share, Save) */}
            <div className="flex items-center justify-between px-3 pt-3">
                <div className="flex items-center space-x-4">
                    <button className="text-gray-700 hover:text-red-500 transition">
                        <Heart size={24} />
                    </button>
                    <button className="text-gray-700 hover:text-gray-400 transition">
                        <MessageCircle size={24} />
                    </button>
                    <button className="text-gray-700 hover:text-blue-500 transition">
                        <Send size={24} />
                    </button>
                </div>
                <button className="text-gray-700 hover:text-black transition">
                    <Bookmark size={24} />
                </button>
            </div>

            {/* CAPTION & DESKRIPSI */}
            <div className="px-3 pb-3 pt-2">
                <div className="text-sm text-gray-800 leading-relaxed">
                    <span className="font-semibold mr-2">system_hub</span>
                    {post.description}
                </div>

                {/* FOOTER: Tanggal Pembuatan */}
                <div className="mt-2 flex items-center text-[11px] text-gray-400 uppercase tracking-wide gap-1">
                    <Calendar size={12} />
                    <span>Dibuat: {formattedDate}</span>
                </div>
            </div>
        </div>
    );
};

export default InstagramPost;