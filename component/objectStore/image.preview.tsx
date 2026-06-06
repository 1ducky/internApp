import Image from "next/image"
type Props = {
    url?: string
    onClickAction?: () => void
}

export default function ImagePreview({
    url, onClickAction
}: Props) {

    if (!url) return null

    return (
        <Image
            onClick={onClickAction}
            width={160}
            height={160}
            src={url}
            alt="preview"
            className="w-40 rounded-md"
        />
    )
}