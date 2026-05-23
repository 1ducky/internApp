import { authService } from "@/services/auth/auth.service";
import { hasPermission } from "@/services/clerk/clerk.service";
import { objectStorageService } from "@/services/objectStorage/obj.service";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({
    image: { maxFileSize: "2MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      console.log("Middleware ran before upload");
      const user = await authService.getSession();
      if (!user) throw new UploadThingError("Unauthorized");
      if (!hasPermission(user.role, "file:upload"))
        throw new UploadThingError("Forbidden");
      return {
        userId: user.userId,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const obj = await objectStorageService.uploadFileImage({
        fileUrl: file.ufsUrl,
        fileSize: file.size,
        mimeType: file.type,
        fileName: file.name,
        fileKey: file.key,
        authorId: metadata.userId,
      })
      return {
        fileUrl: file.ufsUrl,
        fileSize: file.size,
        fileMime: file.type,
        fileName: file.name,
        fileKey: file.key,
        authorId: metadata.userId,
        fileId: obj.success ? obj.data?.id : null
      };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
