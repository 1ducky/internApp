import { PostDto, toPostFormValues } from "@/services/post/post.dto"
import { SubmitPostInput, submitPostSchema } from "@/services/post/post.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { AssetSection } from "./form.asset"
import { UploadMultipleFile } from "@/component/objectStore/imageMultiple.upload"
import { UploadedAssetMetadata } from "@/services/objectStorage/object.dto"
import { useState } from "react"
import { TempAssetSection } from "./form.tempAsset"
import { FormInputField } from "./form.inputField"
import { FormTextArea } from "./form.textArea"
import { ContentPreview } from "./post.preview"
import { FormInputSelect } from "./form.option"
import Link from "next/link"
import { FormSubmitButton } from "./form.submit"
import { postStatusOptions, postTypeOptions } from "@/services/post/post.option"
import { hasPermission } from "@/services/auth/auth.client"

export function FormPostOrchestration({ initialData, temp, action, role }: { initialData?: PostDto, temp?: UploadedAssetMetadata[], action: (values: unknown) => Promise<boolean | null>, role: string }) {
    const [asset, setAsset] = useState<UploadedAssetMetadata[]>(initialData?.assets ?? [])
    const [tempAsset, setTempAsset] = useState<UploadedAssetMetadata[]>(temp ?? [])

    const form = useForm<SubmitPostInput>({
        resolver: zodResolver(submitPostSchema),
        defaultValues: toPostFormValues(initialData)
    })
    // const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const SubmitPost = form.handleSubmit(async (values) => {
        const res = await action(values)
        if (!res) {
            console.log('something wrong')
            return
        }
        form.reset(values)
        // console.log(values)
    }, (error) => {
        console.log(error)
    })

    const typeoptionInput = postTypeOptions.filter(item => !item.permission || hasPermission(role, item.permission))
    const statusoptionInput = postStatusOptions
    return (
        <FormProvider {...form}>
            <form className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col gap-5" onSubmit={SubmitPost}>
                <UploadMultipleFile action={(file: UploadedAssetMetadata[]) => { setAsset(prev => [...prev, ...file]); form.setValue('assets', [...(form.getValues('assets') ?? []), ...file.map(item => item.id)], { shouldDirty: true }) }} />
                <AssetSection Assets={asset} action={(id) => { setAsset(prev => prev.filter(asset => asset.id !== id)); form.setValue('assets', form.getValues('assets')?.filter(asset => asset !== id), { shouldDirty: true }) }} />
                {tempAsset && tempAsset.length !== 0 && (
                    <TempAssetSection tempAssets={tempAsset} action={(item) => {
                        setAsset(prev => [...prev, item]); form.setValue('assets', [...(form.getValues('assets') ?? []), item.id], { shouldDirty: true }); setTempAsset(prev => prev.filter(asset => asset.id !== item.id))
                    }} />
                )}
                <FormInputField field="title" label="Judul" placeholder="Masukkan judul konten..." />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInputSelect field="status" options={statusoptionInput} />
                    <FormInputSelect field="type" options={typeoptionInput} />
                </div>
                <ContentPreview field="description" />
                <FormTextArea field="description" label="Konten" placeholder="Masukkan konten postingan..." />
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t">
                    <Link href="/dashboard/post"
                        type="button"
                        className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Batal
                    </Link>
                    <FormSubmitButton isDisable={!form.formState.isDirty || form.formState.isSubmitting} busyText={form.formState.isSubmitting ? '...Processing' : undefined} />
                </div>
            </form>
        </FormProvider>
    )
}