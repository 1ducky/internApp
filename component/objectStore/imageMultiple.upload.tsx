'use client'

import { toUploadResponse, UploadedAssetMetadata } from "@/services/objectStorage/object.dto";
import { useUploadThing } from "@/utils/uploadthing";

export function UploadMultipleFile({ action }: { action: (file: UploadedAssetMetadata[]) => void }) {
    const { startUpload } = useUploadThing('imageUploader')

    const onUploaded = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const filesInput = Array.from(e.target.files || []);
        const files = await startUpload(filesInput)
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