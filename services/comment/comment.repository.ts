import prisma from "@/libs/db";

export const commentRepository = {
    addComment,
    getCommentByPostId
}

async function addComment(payload: {
  postId: string;
  authorId: string;
  content: string;
}) {
    const db = await prisma.comment.create({
        data:{
            postId: payload.postId,
            authorId: payload.authorId,
            content: payload.content,
        },
        select:{
            id:true,
            createdAt:true,
            content:true,
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

    return db;
}

async function getCommentByPostId(postId:string,nextCursor?:string) {
  const db = await prisma.comment.findMany({
    take:10,
    orderBy:{createdAt:'desc'},
    where:{
      postId:postId,
    },
    ...(nextCursor ? {cursor:{id:nextCursor},skip:1}:{}),
    select:{
        content:true,
        id:true,
        createdAt:true,
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
  return db
}