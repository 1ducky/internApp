import { Post } from "@/generated/prisma/client";

export const toPostDto = (post: Post) => {
    return {
    id: post.id,
    title: post.title,
    description: post.description,
    slug: post.slug,
    imageUrl: post.imageUrl ?? undefined,
    type: post.type,
    status: post.status,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }

}

export type PostDto = ReturnType<typeof toPostDto>

export const toPostDtoList = (posts: Post[]) : PostDto[] => {
    return posts.map(toPostDto)
}