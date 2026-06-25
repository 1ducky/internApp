import { Files, Post } from "@/generated/prisma/client";
import { SubmitPostInput } from "./post.schema";
import { toAssetsDto } from "../objectStorage/object.dto";
import { FeedDetailProps } from "../feed/feed.dto";

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
    authorId: post.authorId,
  }

}

export type PostDto = ReturnType<typeof toPostDto>

export const toPostDtoList = (posts: PostWithAssets[]): PostDto[] => {
  return posts.map(toPostDto)
}

export const toPostFormValues = (post?: PostDto): SubmitPostInput => {
  return {
    title: post ? post.title ?? "" : "",
    description: post ? post.description ?? "" : "",
    type: post ? post.type ?? "" : "FEED",
    status: post ? post.status ?? "" : "PUBLISHED",
    slug: "",
    assets: post?.assets.map(asset => asset.id) ?? []
  }
}

export type PostFormValue = ReturnType<typeof toPostFormValues>

export type ResponsePostApi = {
  message: string
  code: number
  data?: PostDto
  error?: string
}

export const toResponsePostApi = (message: string, code: number, data?: PostDto, error?: string): ResponsePostApi => {
  return {
    message,
    code,
    data,
    error
  }
}

export const toResponsePostToFeedApi = (message: string, code: number, error?: string, post?: FeedDetailProps) => {
  return {
    message,
    code,
    data: post ?? undefined,
    error
  }
}