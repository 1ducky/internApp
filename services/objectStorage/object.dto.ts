import { Files } from "@/generated/prisma/client"

export const toAssetsDto = (assets: Files) => {
  return {
    id: assets.id,
    fileUrl: assets.fileUrl,
    fileSize: assets.fileSize,
    fileName: assets.fileName,
    fileKey:assets.fileKey,
    mimeType:assets.mimeType,
    authorId:assets.authorId ?? ""
  }
}
export type AssetsDto = ReturnType<typeof toAssetsDto> 

export type UploadedAssetMetadata = {
   fileKey: string
   fileUrl: string
   fileName: string
   mimeType: string
   fileSize: number
   authorId:string
   id:string
}

type UploadThingFileResponse = {
    key: string
    name: string
    size: number
    type: string
    ufsUrl: string
    serverData: UploadedAssetMetadata
}

export const toUploadResponse = (res: UploadThingFileResponse[]): UploadedAssetMetadata[] => {
    return res.map(({ serverData }) => ({
        id:serverData.id,
        authorId:serverData.authorId,
        fileKey: serverData.fileKey,
        fileUrl: serverData.fileUrl,
        fileName: serverData.fileName,
        mimeType: serverData.mimeType,
        fileSize: serverData.fileSize,
    }));
};