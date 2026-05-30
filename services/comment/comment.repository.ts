import prisma from "@/libs/db";

export const commentRepository = {
    addComment
}

async function addComment(payload: {
  postId: string;
  authorId: string;
  content: string;
  id:string
}) {
    const db = await prisma.comment.create({
        data:{
            id: payload.id,
            postId: payload.postId,
            authorId: payload.authorId,
            content: payload.content,
        },
        select:{id:true,createdAt:true}
    })

    return db;
}

