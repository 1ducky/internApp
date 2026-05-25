'use client'

import { SubmitPostInput, submitPostSchema } from "@/services/post/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import ImagePreview from "../objectStore/image.preview";
import { useState } from "react";
import { PostDto, toPostFormValues } from "@/services/post/post.dto";
import { UploadMultipleFile } from "../objectStore/imageMultiple.upload";
import { UploadedAssetMetadata } from "@/services/objectStorage/object.dto";

const PostForm = ({ action,initialData }: { action: (value: unknown) => void, initialData?:PostDto }) => {
    const [assetsEditor, setAssetEditor] = useState<UploadedAssetMetadata[] >(initialData?.assets ??[])

    const form = useForm<SubmitPostInput>({
        resolver: zodResolver(submitPostSchema),
        defaultValues:toPostFormValues(initialData)
    })
    const onSubmited = form.handleSubmit(async (values) => {
        action(values)
        form.reset(values)
        // console.log(values)

    }, (error) => {
        console.log(error)
    })
    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">
                Buat Konten Baru
            </h2>

            <form className="space-y-6" onSubmit={onSubmited}>
                {/* FIELD: JUDUL */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Judul
                    </label>
                    <input
                        type="text"
                        {...form.register("title")}
                        placeholder="Masukkan judul konten..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                    />
                </div>

                {/* GRID LAYOUT UNTUK TYPE DAN STATUS (Responsive: 1 kolom di mobile, 2 kolom di tablet ke atas) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* FIELD: TYPE */}
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                            Tipe Konten
                        </label>
                        <select
                            {...form.register("type")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                        >
                            <option value="ANNOUNCEMENT">Announcement</option>
                            <option value="EVENT">Event</option>
                            <option value="DISCUSSION">Discussion</option>
                            <option value="NEWS">News</option>
                        </select>
                    </div>

                    {/* FIELD: STATUS */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            {...form.register("status")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                        >
                            <option value="DRAFT">Draft (Default)</option>
                            <option value="PUBLISHED">Published</option>
                            <option value="ARCHIVED">Archived</option>
                        </select>
                    </div>
                </div>

                {/* FIELD: CONTENT / TEXTAREA */}
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                        Konten
                    </label>
                    <textarea
                        {...form.register("description")}
                        rows={6}
                        placeholder="Tulis konten lengkap di sini..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400 resize-y"
                    ></textarea>
                </div>
                {/* <ImageUpload onChange={(url,id) => {
                    form.setValue("assets", [...(form.getValues("assets") ?? []), id])
                    setPreviewImage([...previewImage, url])
                }} /> */}
                <UploadMultipleFile action={(file: UploadedAssetMetadata[]) =>{ setAssetEditor(prev => [...prev,...file]); form.setValue('assets', [...(form.getValues('assets') ?? []), ...file.map(item => item.id)])} }/>
                {assetsEditor.map((item) => {
                    return (<div key={item.id}>
                        <ImagePreview url={item.fileUrl} onClickAction={() => { setAssetEditor(prev => prev.filter(asset => asset.id !== item.id)); form.setValue('assets', form.getValues('assets')?.filter(id => id!== item.id))  }}/>
                    </div>)
                })}

                {/* TOMBOL AKSI (Responsive: Full width di mobile, otomatis/fit di layar besar) */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
                    <Link href="/dashboard/post"
                        type="button"
                        className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Batal
                    </Link>
                    <input disabled={!form.formState.isDirty || form.formState.isSubmitting} type="submit" className={`w-full sm:w-auto px-5 py-2 text-white rounded-lg text-sm font-medium transition ${form.formState.isSubmitting || !form.formState.isDirty ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`} value={form.formState.isSubmitting ? "Processing..." : "Save Changes"} />
                </div>
                
            </form>
        </div>
    );
};

export default PostForm;