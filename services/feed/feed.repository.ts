import { PostType } from "@/generated/prisma/enums";
import prisma from "@/libs/db";

export const feedRepository = {
  getRawFeedPost,
  getRawOwnFeed,
  getDetailFeed
}

const maxTake = 100

async function getRawFeedPost(nextCursor?:string,type:PostType = 'FEED',take:number=10 ) {
  const db = await prisma.post.findMany({
    take:Math.min(take,maxTake),
    orderBy:{createdAt:'desc'},
    where:{
      status:'PUBLISHED',
      type:type
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
async function getRawOwnFeed(userId:string,nextCursor?:string, type?:PostType,take:number=10 ) {
  const db = await prisma.post.findMany({
    take:Math.min(take,maxTake),
    orderBy:{createdAt:'desc'},
    where:{
      authorId:userId,
      status:'PUBLISHED',
      ...(type && {type})
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
async function getDetailFeed(slug:string) {
  const db = await prisma.post.findFirst({

    where:{
      slug:slug,
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
  return db
}