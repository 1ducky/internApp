import prisma from "@/libs/db";
import { ObjInput, ObjListInput, ObjType } from "./obj.schema";
import { TransactionClient } from "@/generated/prisma/internal/prismaNamespace";

export const objrepository = {
  uploadFile,
  uploadBulkFile,
};

export const transactionFilePostRepository = {
  getActiveFilefromPost,
  activeFilefromPost,
  orphanFilefromPost,
};

async function activeFilefromPost(
  tx: TransactionClient,
  assetIds: string[],
  authorId: string,
  postId: string | null,
) {
  const db = await tx.files.updateMany({
    where: {
      id: {
        in: assetIds,
      },
      authorId: authorId,
      fileStatus: "TEMP",
    },
    data: {
      postId: postId,
      fileStatus: "ACTIVE",
    },
  });
  return db;
}
async function orphanFilefromPost(
  tx: TransactionClient,
  assetIds: string[],
  authorId: string,
  postId: string | null,
) {
  const db = await tx.files.updateMany({
    where: {
      id: {
        in: assetIds,
      },
      authorId: authorId,
      fileStatus: "ACTIVE",
    },
    data: {
      postId: postId,
      fileStatus: "ORPHAN",
    },
  });
  return db;
}
async function getActiveFilefromPost(tx: TransactionClient, postId: string) {
  const db = await tx.files.findMany({
    where: {
      postId: postId,
      fileStatus: "ACTIVE",
    },
    select: {
      id: true,
    },
  });
  return db;
}

async function uploadFile(metadata: ObjInput, type: ObjType) {
  const db = await prisma.files.create({
    data: {
      fileType: type,
      fileUrl: metadata.fileUrl,
      fileSize: metadata.fileSize,
      mimeType: metadata.mimeType,
      fileName: metadata.fileName,
      fileKey: metadata.fileKey,
      authorId: metadata.authorId,
    },
    select: {
      id: true,
    },
  });
  if (!db) {
    return { success: false };
  }
  return { success: true, data: db };
}

async function uploadBulkFile(
  files: ObjListInput,
  userId: string,
  type: ObjType,
) {
  const db = await prisma.files.createMany({
    data: files.map((item) => ({
      // ✅ pakai ({  bukan {
      id: item.id,
      fileType: type,
      fileUrl: item.fileUrl,
      fileSize: item.fileSize,
      mimeType: item.mimeType,
      fileName: item.fileName,
      fileKey: item.fileKey,
      authorId: userId, // dari parameter, bukan item
    })),
  });
  if (!db) return { success: false };
  return { success: true, data: db.count };
}
