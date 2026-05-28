'use client'

import { toUploadResponse, UploadedAssetMetadata } from "@/services/objectStorage/object.dto";
import { useImageCompressor } from "@/utils/imageCompressorClientSide";
import { useUploadThing } from "@/utils/uploadthing";

export function UploadMultipleFile({ action }: { action: (file: UploadedAssetMetadata[]) => void }) {
    const { startUpload } = useUploadThing('imageUploader')
    const { compress, isCompressing } = useImageCompressor()

    const onUploaded = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const filesInput = Array.from(e.target.files || []);
        const commpressed = await compress(filesInput)
        const files = await startUpload(commpressed)
        if (!files) return
        const FileDto = toUploadResponse(files)
        action(FileDto)
    };
    return (
        <>
            <div >
                <input type="file" name="file" id="file" multiple onChange={onUploaded} />
            </div>
        </>
    )

}