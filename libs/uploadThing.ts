import { logger } from "@/infrastructure/lib/logger";
import crypto from "crypto";
import { authService } from "@/services/auth/auth.service";
import { hasPermission } from "@/services/clerk/clerk.service";
import { objectStorageService } from "@/services/objectStorage/obj.service";
import { uploadThingService } from "@/services/UploadThing/uploadthing.service";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({
    image: { maxFileSize: "256KB", maxFileCount: 3 },
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
      // generate uuid from file key and user id
      // generate payload,
      // try upload metadata payload
      // if failed, delete file from uploadthing
      // if success, return payload
      
      try{
        const uuid = crypto
        .createHash('sha256')
        .update(file.key + metadata.userId)
        .digest('hex');
        
        const payload = {
          fileUrl: file.ufsUrl,
          fileSize: file.size,
          mimeType: file.type,
          fileName: file.name,
          fileKey: file.key,
          authorId: metadata.userId,
          id: uuid.slice(0,20)
        }
        const res = await objectStorageService.uploadFileImage(payload)

        if(!res.success){
          throw new UploadThingError("Failed Commit to Database")
        }

        return payload

      }catch(err){
        logger.error(`File upload request failed`, 'UploadThingRouter')
        const UT = await uploadThingService.deleteFile(file.key)
        if(!UT.success){
          logger.error(`File deletion failed`, 'UploadThingRouter')
          console.log(file)
        }else if(UT.success){
          logger.info('successfuly prevent orphan file', 'UploadThingRouter')
          console.log(err)
        }
        throw new UploadThingError("Failed Commit to Database")
      }
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
