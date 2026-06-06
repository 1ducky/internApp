import FeedCarouselPreview from "@/component/feed/feed.carouselPreview";
import { UploadedAssetMetadata } from "@/services/objectStorage/object.dto";

export function AssetSection({ Assets, action }: { Assets: UploadedAssetMetadata[], action?: (id: string) => void }) {
    return (
        <>
            <FeedCarouselPreview assets={Assets} action={action} />
        </>
    )
}