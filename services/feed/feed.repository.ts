import prisma from "@/libs/db";

export const feedRepository = {
  getRawFeedPost
}

async function getRawFeedPost(nextCursor?:string) {
  const db = await prisma.post.findMany({
    take:10,
    orderBy:{createdAt:'desc'},
    where:{
      status:'PUBLISHED',
    },
    ...(nextCursor ? {cursor:{id:nextCursor},skip:1}:{}),
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
  return db
}