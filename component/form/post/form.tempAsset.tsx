import { UploadedAssetMetadata } from "@/services/objectStorage/object.dto";
import ImagePreview from "@/component/objectStore/image.preview";

export function TempAssetSection({ tempAssets, action }: { tempAssets: UploadedAssetMetadata[], action: (item: UploadedAssetMetadata) => void }) {
    return (
        <>
            <h2 className="text-sm font-medium text-gray-700 mb-1">file sementara</h2>
            <p className="text-xs text-gray-500 mb-2">Sepertinya Ada file yang kamu upload tidak tersimpan, <br /> anda bisa menautkan ulang dengan mengklik gambar dibawah ini tanpa perlu upload ulang, <br /> gambar tersebut akan dihapus secara periodik</p>
            <div className="flex flex-row gap-5 overflow-x-scroll">
                {tempAssets.map((item) => {
                    return (<div key={item.id}>
                        <ImagePreview url={item.fileUrl} onClickAction={() => { action(item) }} />
                    </div>)
                })}
            </div>
        </>
    )
}