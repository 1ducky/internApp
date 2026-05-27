import prisma from "@/libs/db";
import { SubmitPostInput } from "./post.schema";
import { transactionFilePostRepository } from "../objectStorage/obj.repository";

export const postRepository = {
  CreatePost,
  updatePostById,
  deletePostById,
  getPostById,
  GetAllUserPost,
  submitPostwithAssets,
  updatePostByIdWithAssets,
  deletePostByIdwithAsstes,
};

export const CosummerPostRepository = {
  getFeedPost
}

async function getFeedPost() {
  const db = await prisma.post.findMany({
    take:10,
    orderBy:{createdAt:'desc'},
    where:{
      status:'PUBLISHED',
    },
    select:{
      id:true,
      title:true,
      description:true,
      type:true,
      status:true,
      slug:true,
      viewCount:true,
      createdAt:true,
      assets:{
        where:{
          fileStatus:'ACTIVE',
          fileType:'IMAGE'
        },
        select:{
          id:true,
          fileUrl:true,
        }
      },
      author:{
        select:{
          id:true,
          name:true,
          imageUrl:true,
          profile:{
            select:{
              userName:true
            }
          }
        }
      }
    }
  })
  if (!db) {
    return { success: false };
  }
  return { success: true, data: db };
}

async function CreatePost(userId: string, data: SubmitPostInput) {
  const db = await prisma.post.create({
    data: {
      authorId: userId,
      description: data.description,
      slug: data.slug,
      status: data.status,
      title: data.title,
      type: data.type,
      assets: { connect: data.assets?.map((id) => ({ id })) },
    },
  });
  if (!db) {
    return { success: false };
  }
  return { success: true, data: db };
}

async function submitPostwithAssets(userId: string, data: SubmitPostInput) {
  const assetIds = data.assets ?? [];

  const db = await prisma.$transaction(async (tx) => {
    const post = await tx.post.create({
      data: {
        authorId: userId,
        description: data.description,
        slug: data.slug,
        status: data.status,
        title: data.title,
        type: data.type,
      },
    });

    const activated = await transactionFilePostRepository.activeFilefromPost(
      tx,
      assetIds,
      userId,
      post.id,
    );
    if (activated.count !== assetIds.length) {
      throw new Error("INVALID_ASSET");
    }
    return post;
  });

  return {
    success: true,
    data: db,
  };
}

async function updatePostByIdWithAssets(
  userId: string,
  data: SubmitPostInput,
  id: string,
) {
  const assetIds = [...new Set(data.assets ?? [])];
  const db = await prisma.$transaction(async (tx) => {
    const currentAssets =
      await transactionFilePostRepository.getActiveFilefromPost(tx, id);
    const currentAssetIds = currentAssets.map((asset) => asset.id);

    const currentSet = new Set(currentAssetIds);
    const incomingSet = new Set(assetIds);

    const toAdd = assetIds.filter((id) => !currentSet.has(id));
    const toRemove = currentAssetIds.filter((id) => !incomingSet.has(id));
    //add
    const activated = await transactionFilePostRepository.activeFilefromPost(
      tx,
      toAdd,
      userId,
      id,
    );
    if (activated.count !== toAdd.length) {
      throw new Error("INVALID_ASSET");
    }
    await transactionFilePostRepository.orphanFilefromPost(
      tx,
      toRemove,
      userId,
      null,
    );
    const post = await tx.post.update({
      where: {
        id: id,
        authorId: userId,
      },
      data: {
        description: data.description,
        slug: data.slug,
        status: data.status,
        title: data.title,
        type: data.type,
      },
    });
    return post;
  });

  return {
    success: true,
    data: db,
  };
}

async function updatePostById(
  userId: string,
  data: SubmitPostInput,
  id: string,
) {
  const uniqueAsset = [...new Set(data.assets)];
  const db = await prisma.post.update({
    where: {
      id: id,
      authorId: userId,
    },
    data: {
      description: data.description,
      slug: data.slug,
      status: data.status,
      title: data.title,
      type: data.type,
      assets: { set: uniqueAsset?.map((id) => ({ id })) },
    },
  });
  if (!db) {
    return { success: false };
  }
  return { success: true, data: db };
}

async function deletePostByIdwithAsstes(userId: string, id: string) {
  const db = await prisma.$transaction([
    prisma.files.updateMany({
      where: { postId: id, authorId: userId },
      data: { fileStatus: "ORPHAN" },
    }),
    prisma.post.delete({ where: { id: id, authorId: userId } }),
  ]);
  if (!db) {
    return { success: false };
  }
  return { success: true };
}
async function deletePostById(userId: string, id: string) {
  const db = await prisma.post.delete({
    where: {
      id: id,
      authorId: userId,
    },
  });
  if (!db) {
    return { success: false };
  }
  return { success: true };
}

async function getPostById(id: string) {
  const db = await prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      type: true,
      status: true,
      slug: true,
      authorId: true,
      viewCount: true,
      createdAt: true,
      updatedAt: true,
      assets: true,
    },
  });
  if (!db) {
    return { success: false };
  }
  return { success: true, data: db };
}

async function GetAllUserPost(userId: string) {
  const db = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      type: true,
      status: true,
      slug: true,
      authorId: true,
      viewCount: true,
      createdAt: true,
      updatedAt: true,
      assets: true,
    },
  });
  if (!db) {
    return { success: false };
  }
  return { success: true, data: db };
}
