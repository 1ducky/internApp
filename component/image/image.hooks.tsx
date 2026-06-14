import { useMemo, useRef, useState } from "react"
import { Area } from "react-easy-crop"
import { cropImageToFile } from "@/utils/Image/imageCropperClient"
import ImageCropper from "./image.crop"

const DEFAULT_ASPECT_RATIOS = [
    { label: '1:1', value: 1 / 1 },
    { label: '5:4', value: 5 / 4 },
    { label: '4:3', value: 4 / 3 },
    { label: '3:2', value: 3 / 2 },
    { label: '5:3', value: 5 / 3 },
    { label: '16:9', value: 16 / 9 },
    { label: '3:1', value: 3 / 1 },
]

interface UseCropImageOptions {
    aspectRatios?: number | number[]
}


export function useCropImage(options?: UseCropImageOptions) {
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const resolveRef = useRef<((file: File) => void) | null>(null)
    const rejectRef = useRef<((reason?: unknown) => void) | null>(null)
    const fileRef = useRef<File | null>(null)

    const aspectRatioOption = options?.aspectRatios

    const ratios = useMemo(() => {
        if (!aspectRatioOption) return DEFAULT_ASPECT_RATIOS

        const input = Array.isArray(aspectRatioOption)
            ? aspectRatioOption
            : [aspectRatioOption]

        return DEFAULT_ASPECT_RATIOS.filter(r => input.includes(r.value))
    }, [aspectRatioOption])

    const cropImage = (file: File): Promise<File> => {
        cleanUp()
        fileRef.current = file
        setImageUrl(URL.createObjectURL(file))

        return new Promise((resolve, reject) => {
            resolveRef.current = resolve
            rejectRef.current = reject
        })
    }

    const cleanUp = () => {
        if (imageUrl) {
            URL.revokeObjectURL(imageUrl)
        }
        fileRef.current = null
    }

    const handleCropDone = async (croppedArea: Area) => {
        if (!fileRef.current || !resolveRef.current) return
        const croppedFile = await cropImageToFile(fileRef.current, croppedArea)
        cleanUp()
        setImageUrl(null)
        resolveRef.current(croppedFile)
    }

    const handleCancel = () => {
        cleanUp()
        setImageUrl(null)
        rejectRef.current?.(new Error('Crop cancelled'))
    }

    const CropModal = imageUrl ? (
        <ImageCropper
            imageUrl={imageUrl}
            aspectRatios={ratios}
            onCropDone={handleCropDone}
            onCancel={handleCancel}
        />
    ) : null

    return { cropImage, CropModal }
}