'use client'

import { toUploadResponse, UploadedAssetMetadata } from "@/services/objectStorage/object.dto";
import { useUploadThing } from "@/utils/uploadthing";
import { useImageCompressor } from "@/utils/imageCompressorClientSide";
import { useEffect, useState } from "react";


type assetRecord = {
    id: string
    fileUrl: string
}

type handler = (asset: assetRecord[]) => void
type progress = (progress: Record<number, number>) => void
export function NewUploadMultipleFile({ action, onChangeTempImage, onCompressedImage, onProgress, onComplateCompressing }: { action: handler, onChangeTempImage: handler, onCompressedImage: handler, onProgress: progress, onComplateCompressing: (isCompressing: boolean) => void }) {
    const { startUpload } = useUploadThing('imageUploader')
    const { compress, isCompressing, progress } = useImageCompressor()

    // Watch Depedency
    const [tempImage, setTempImage] = useState<assetRecord[]>([])
    const [compressedImage, setCompressedImage] = useState<assetRecord[]>([])

    useEffect(() => {
        action(compressedImage)
        onCompressedImage(compressedImage)
    }, [compressedImage])
    useEffect(() => {
        onChangeTempImage(tempImage)
    }, [tempImage])
    useEffect(() => {
        onProgress(progress)
    }, [progress])
    useEffect(() => {
        onComplateCompressing(isCompressing)
    }, [isCompressing])


    const onUploaded = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const filesInput = Array.from(e.target.files || []);
        const tempArrayImage: assetRecord[] = filesInput.map((file) => ({
            id: crypto.randomUUID(),
            fileUrl: URL.createObjectURL(file),
        }));

        setTempImage(tempArrayImage)
        const compressed = await compress(filesInput)
        if (!compressed) return
        const comppressedArray: assetRecord[] = compressed.map((file) => ({
            id: crypto.randomUUID(),
            fileUrl: URL.createObjectURL(file),
        }));
        setCompressedImage(comppressedArray)

        // const files = await startUpload(compressed)
        // if (!files) return
        // const FileDto = toUploadResponse(files)
        // action(FileDto)
    };
    return (
        <>
            <div >
                <input type="file" name="file" id="file" multiple onChange={onUploaded} />
            </div>
        </>
    )

}