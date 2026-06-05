'use client'

import { SubmitPostInput, submitPostSchema } from "@/services/post/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import ImagePreview from "../objectStore/image.preview";
import { useState } from "react";
import { PostDto, toPostFormValues } from "@/services/post/post.dto";
import { UploadMultipleFile } from "../objectStore/imageMultiple.upload";
import { UploadedAssetMetadata } from "@/services/objectStorage/object.dto";
import FeedCarouselPreview from "../feed/feed.carouselPreview";
import { renderFormattedDescription } from "@/utils/feed/ContentFormater";

const PostForm = ({ action, initialData, tempImage }: { action: (value: unknown) => Promise<boolean | null>, initialData?: PostDto, tempImage?: UploadedAssetMetadata[] | [] }) => {
    const [assetsEditor, setAssetEditor] = useState<UploadedAssetMetadata[]>(initialData?.assets ?? [])
    const [assetsTempImage, setAssetsTempImage] = useState<UploadedAssetMetadata[]>(tempImage ?? [])

    const form = useForm<SubmitPostInput>({
        resolver: zodResolver(submitPostSchema),
        defaultValues: toPostFormValues(initialData)
    })
    const onSubmited = form.handleSubmit(async (values) => {
        // const res = await action(values)
        // if (!res) {
        //     console.log('something wrong')
        //     return
        // }
        // form.reset(values)
        console.log(values)

    }, (error) => {
        console.log(error)
    })

    const preview = useWatch({
        control: form.control,
        name: "description",
        defaultValue: initialData?.description
    })
    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">
                Buat Konten Baru
            </h2>

            <form className="space-y-6" onSubmit={onSubmited}>
                <UploadMultipleFile action={(file: UploadedAssetMetadata[]) => { setAssetEditor(prev => [...prev, ...file]); form.setValue('assets', [...(form.getValues('assets') ?? []), ...file.map(item => item.id)], { shouldDirty: true }) }} />
                {/* {assetsEditor.map((item) => {
                    return (<div key={item.id}>
                        <ImagePreview url={item.fileUrl} onClickAction={() => { setAssetEditor(prev => prev.filter(asset => asset.id !== item.id)); form.setValue('assets', form.getValues('assets')?.filter(id => id !== item.id), { shouldDirty: true }) }} />
                    </div>)
                })} */}
                <FeedCarouselPreview assets={assetsEditor} />

                {
                    assetsTempImage.length !== 0 ?
                        (
                            <>
                                <h2 className="text-sm font-medium text-gray-700 mb-1">file sementara</h2>
                                <p className="text-xs text-gray-500 mb-2">Sepertinya Ada file yang kamu upload tidak tersimpan, <br /> anda bisa menautkan ulang dengan mengklik gambar dibawah ini tanpa perlu upload ulang, <br /> gambar tersebut akan dihapus secara periodik</p>
                                <div className="flex flex-row gap-5 overflow-x-scroll">
                                    {assetsTempImage.map((item) => {
                                        return (<div key={item.id}>
                                            <ImagePreview url={item.fileUrl} onClickAction={() => { setAssetEditor(prev => [...prev, item]); form.setValue('assets', [...(form.getValues('assets') ?? []), item.id], { shouldDirty: true }); setAssetsTempImage(prev => prev.filter(asset => asset.id !== item.id)) }} />
                                        </div>)
                                    })}
                                </div>
                            </>
                        ) : null
                }
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
                            <option value="FEED">Feed</option>
                            <option value="ANNOUNCEMENT">Pengumuman</option>
                            <option value="EVENT">Acara</option>
                            <option value="DISCUSSION">Diskusi</option>
                            <option value="NEWS">Berita</option>
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
                            <option value="PUBLISHED">Publikasi</option>
                            <option value="DRAFT">Draft</option>
                        </select>
                    </div>
                </div>

                {/* FIELD: CONTENT / TEXTAREA */}

                {preview.trim().length > 0 ? (
                    <>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1 ">
                            Preview
                        </label>
                        <div className="bg-white dark:bg-zinc-900 py-10 px-5 rounded-2xl max-h-72 overflow-y-scroll">
                            <div className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line mb-3">
                                {renderFormattedDescription(preview || '')}
                            </div>
                        </div>
                    </>
                ) : null}
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