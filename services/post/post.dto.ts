import { Files, Post } from "@/generated/prisma/client";
import { SubmitPostInput } from "./post.schema";
import { toAssetsDto } from "../objectStorage/object.dto";

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

export const toPostFormValues = (post?:PostDto) : SubmitPostInput => {
  return{
    title: post ? post.title??  "" : "",
    description: post ? post.description?? "" : "",
    type: post ? post.type?? "" : "ANNOUNCEMENT",
    status: post ? post.status?? "" : "DRAFT",
    slug:"",
    assets: post?.assets.map(asset => asset.id) ?? []
  }
}

export type PostFormValue = ReturnType<typeof toPostFormValues>