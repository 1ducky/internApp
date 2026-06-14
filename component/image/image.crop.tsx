import { useState } from "react"
import Cropper, { Area } from "react-easy-crop"

interface ImageCropperProps {
    imageUrl: string
    aspectRatios: { label: string; value: number }[]
    onCropDone: (croppedArea: Area) => void
    onCancel: () => void
}

export default function ImageCropper({ imageUrl, onCropDone, onCancel, aspectRatios }: ImageCropperProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedArea, setCroppedArea] = useState<Area | undefined>(undefined)
    const [aspectRatio, setAspectRatio] = useState(aspectRatios[0].value)

    const handleCropComplete = (_: Area, croppedAreaPixels: Area) => {
        setCroppedArea(croppedAreaPixels)
    }

    const handleAspectRatioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAspectRatio(Number(e.target.value))
    }

    return (
        <div className="w-full h-screen fixed -inset-0">
            <div className="relative w-full h-full">
                <Cropper
                    image={imageUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspectRatio}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                    objectFit="contain"
                />
            </div>

            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col gap-4">
                {
                    aspectRatios.length > 1 && <div onChange={handleAspectRatioChange} className='flex justify-center items-center flex-row gap-10 dark:bg-zinc-100 bg-zinc-800 text-white dark:text-zinc-800 px-5 py-2 rounded-full overflow-hidden'>
                        {aspectRatios.map((ratio) => (
                            <label key={ratio.label} className={`cursor-pointer rounded-full px-3 py-1 transition-colors ${aspectRatio === ratio.value ? 'bg-blue-500 dark:bg-blue-500 text-white dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}>
                                <input type="radio" name="aspectRatio" value={ratio.value} className="hidden" />
                                {ratio.label}
                            </label>
                        ))}
                    </div>
                }

                <div className="flex">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" type="button" onClick={() => croppedArea && onCropDone(croppedArea)}>
                        Crop
                    </button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" type="button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}