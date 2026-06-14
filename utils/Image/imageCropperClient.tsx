import { Area } from "react-easy-crop"

export const cropImageToFile = (
    imageFile: File,
    croppedArea: Area,
): Promise<File> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas')
        canvas.width = croppedArea.width
        canvas.height = croppedArea.height

        const ctx = canvas.getContext('2d')
        if (!ctx) return reject(new Error('Failed to get canvas context'))

        const objectUrl = URL.createObjectURL(imageFile)
        const img = new Image()
        img.src = objectUrl

        img.onload = () => {
            ctx.drawImage(
                img,
                croppedArea.x,
                croppedArea.y,
                croppedArea.width,
                croppedArea.height,
                0,
                0,
                croppedArea.width,
                croppedArea.height
            )

            URL.revokeObjectURL(objectUrl) // cleanup memory

            canvas.toBlob((blob) => {
                if (!blob) return reject(new Error('Failed to create blob'))
                const file = new File([blob], imageFile.name, { type: imageFile.type })
                resolve(file)
            }, imageFile.type)
        }

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl)
            reject(new Error('Failed to load image'))
        }
    })
}