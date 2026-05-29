// 'use client'

// import { SubmitPostInput, submitPostSchema } from "@/services/post/post.schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { PostDto, toPostFormValues } from "@/services/post/post.dto";
// import { UploadedAssetMetadata } from "@/services/objectStorage/object.dto";
// import FeedCarouselPreview from "@/component/feed/feed.carouselPreview";
// import { NewUploadMultipleFile } from "@/component/objectStore/newImageMultiple.upload";

// type assetRecord = {
//     id: string
//     fileUrl: string
// }

// export default function NewPostForm({ action, initialData, tempImage }: { action: (value: unknown) => void, initialData?: PostDto, tempImage?: UploadedAssetMetadata[] | [] }) {
//     const [assetsEditor, setAssetEditor] = useState<UploadedAssetMetadata[]>(initialData?.assets ?? [])
//     const [assetsTempImage, setAssetsTempImage] = useState<UploadedAssetMetadata[]>(tempImage ?? [])

//     // watch
//     const [tempImageArray, setTempImageArray] = useState<assetRecord[]>([])
//     const [compressedImageArray, setCompressedImageArray] = useState<assetRecord[]>([])
//     const [progress, setProgress] = useState<Record<number, number>>({})
//     const [isCompressing, setIsCompressing] = useState<boolean>(false)

//     const onChangeImage = (asset: assetRecord[]) => {
//         setTempImageArray(asset)
//     }
//     const onCompressed = (asset: assetRecord[]) => {
//         setCompressedImageArray(asset)
//     }
//     const onProgres = (progress: Record<number, number>) => {
//         setProgress(progress)
//     }
//     const onComplateCompressing = (isCompressing: boolean) => {
//         setIsCompressing(isCompressing)
//     }


//     const form = useForm<SubmitPostInput>({
//         resolver: zodResolver(submitPostSchema),
//         defaultValues: toPostFormValues(initialData)
//     })
//     const onSubmited = form.handleSubmit(async (values) => {
//         action(values)
//         form.reset(values)
//         // console.log(values)

//     }, (error) => {
//         console.log(error)
//     })
//     return (
//         <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-md border border-gray-100">
//             <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">
//                 Buat Konten Baru
//             </h2>

//             <form className="space-y-6" onSubmit={onSubmited}>
//                 {/* FIELD: JUDUL */}
//                 <div>
//                     <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                         Judul
//                     </label>
//                     <input
//                         type="text"
//                         {...form.register("title")}
//                         placeholder="Masukkan judul konten..."
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
//                     />
//                 </div>

//                 {/* GRID LAYOUT UNTUK TYPE DAN STATUS (Responsive: 1 kolom di mobile, 2 kolom di tablet ke atas) */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     {/* FIELD: TYPE */}
//                     <div>
//                         <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
//                             Tipe Konten
//                         </label>
//                         <select
//                             {...form.register("type")}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
//                         >
//                             <option value="ANNOUNCEMENT">Announcement</option>
//                             <option value="EVENT">Event</option>
//                             <option value="DISCUSSION">Discussion</option>
//                             <option value="NEWS">News</option>
//                         </select>
//                     </div>

//                     {/* FIELD: STATUS */}
//                     <div>
//                         <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
//                             Status
//                         </label>
//                         <select
//                             {...form.register("status")}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
//                         >
//                             <option value="DRAFT">Draft (Default)</option>
//                             <option value="PUBLISHED">Published</option>
//                             <option value="ARCHIVED">Archived</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* FIELD: CONTENT / TEXTAREA */}
//                 <div>
//                     <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
//                         Konten
//                     </label>
//                     <textarea
//                         {...form.register("description")}
//                         rows={6}
//                         placeholder="Tulis konten lengkap di sini..."
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400 resize-y"
//                     ></textarea>
//                 </div>

//                 <NewUploadMultipleFile action={() => console.log('test')} onChangeTempImage={onChangeImage} onCompressedImage={onCompressed} onProgress={onProgres} onComplateCompressing={onComplateCompressing} />
//                 <FeedCarouselPreview assets={[]} />
//                 {
//                     assetsTempImage.length !== 0 ?
//                         (
//                             <>
//                                 <h2 className="text-sm font-medium text-gray-700 mb-1">file sementara</h2>
//                                 <p className="text-xs text-gray-500 mb-2">Sepertinya Ada file yang kamu upload tidak tersimpan, <br /> anda bisa menautkan ulang dengan mengklik gambar dibawah ini tanpa perlu upload ulang, <br /> gambar tersebut akan dihapus secara periodik</p>
//                                 <FeedCarouselPreview assets={assetsTempImage} />
//                             </>
//                         ) : null
//                 }



//                 {/* TOMBOL AKSI (Responsive: Full width di mobile, otomatis/fit di layar besar) */}
//                 <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
//                     <Link href="/dashboard/post"
//                         type="button"
//                         className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//                     >
//                         Batal
//                     </Link>
//                     <input disabled={!form.formState.isDirty || form.formState.isSubmitting} type="submit" className={`w-full sm:w-auto px-5 py-2 text-white rounded-lg text-sm font-medium transition ${form.formState.isSubmitting || !form.formState.isDirty ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`} value={form.formState.isSubmitting ? "Processing..." : "Save Changes"} />
//                 </div>

//             </form>
//         </div>
//     );
// };

