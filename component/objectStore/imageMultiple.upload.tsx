'use client'

import { toUploadResponse, UploadedAssetMetadata } from "@/services/objectStorage/object.dto";
import { useImageCompressor } from "@/utils/Image/imageCompressorClientSide";
import { ImageLimitClient } from "@/utils/Image/imageSizeLimiterclient";
import { useUploadThing } from "@/utils/uploadthing";
import { useState } from "react";

export function UploadMultipleFile({ action }: { action: (file: UploadedAssetMetadata[]) => void }) {
    const { startUpload, isUploading, } = useUploadThing('imageUploader')
    // Catata Jika Menggunakan Input Literal Gunakan useMemo
    // const compressorOptions = useMemo(() => ({ maxSizeMB: 1 }), []);
    const { compress, isCompressing, getMessage } = useImageCompressor()
    const [failedFile, setFailedFile] = useState<string[]>([]);

    const onUploaded = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setFailedFile([]);
        const filesInput = Array.from(e.target.files || []);
        if (filesInput.length === 0) return
        const commpressed = await compress(filesInput)
        if (commpressed.length === 0) return
        const sanitized = await ImageLimitClient(commpressed)
        if (sanitized.failed.length > 0) {
            setFailedFile(sanitized.failed)
        }
        const files = await startUpload(sanitized.sanitized)
        if (!files) return
        const FileDto = toUploadResponse(files)
        action(FileDto)
        e.target.files = null
    };
    return (
        <>
            <div className="flex items-start gap-2 flex-col">
                <input type="file" name="file" id="uploadInput" className="hidden" multiple onChange={onUploaded} disabled={isUploading || isCompressing} />
                <button type="button" onClick={() => document.getElementById('uploadInput')!.click()} disabled={isUploading || isCompressing} className="px-5 py-2 bg-black rounded-2xl text-white">{isUploading ? 'Uploading...' : isCompressing ? 'Compressing...' : 'Upload'}</button>
                {getMessage ? <p className="text-blue-500">{getMessage}</p> : null}
                {failedFile.length > 0 ? (
                    <>
                        {failedFile.map((file, index) => {
                            return <p className="text-red-500" key={index}>{file}</p>
                        })}
                    </>
                ) : null}
            </div>
        </>
    )

}