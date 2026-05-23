'use client'

import { UploadButton } from "@uploadthing/react"
import type { UploadRouter } from "@/libs/uploadThing" 

type Props = {
    onChange: (url: string,id:string) => void
}

export default function ImageUpload({
    onChange
}: Props) {

    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <UploadButton<UploadRouter, "imageUploader">
                endpoint="imageUploader"

                onClientUploadComplete={(res) => {
                    if (!res?.[0]) return

                    onChange(res[0].serverData.fileUrl,res[0].serverData.fileId || "")
                    // debt
                }}

                onUploadError={(error) => {
                    console.error(error)
                }} className="bg-black"
            />
        </div>
    )
}