import { generateReactHelpers } from "@uploadthing/react"

import type { UploadRouter } from "@/libs/uploadThing"

export const { useUploadThing, uploadFiles } =
    generateReactHelpers<UploadRouter>()