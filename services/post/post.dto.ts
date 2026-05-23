import { Files, Post } from "@/generated/prisma/client";

export const toAssetsDto = (assets: Files) => {
  return {
    id: assets.id,
    fileUrl: assets.fileUrl,
    fileSize: assets.fileSize,
    fileName: assets.fileName,
  }
}

type PostWithAssets = Post & { assets?: Files[] }

export const toPostDto = (post: PostWithAssets) => {
    return {
    id: post.id,
    title: post.title,
    description: post.description,
    slug: post.slug,
    type: post.type,
    status: post.status,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    assets: post.assets?.map(toAssetsDto) ?? [],
  }

}

export type PostDto = ReturnType<typeof toPostDto>

export const toPostDtoList = (posts: PostWithAssets[]) : PostDto[] => {
    return posts.map(toPostDto)
}