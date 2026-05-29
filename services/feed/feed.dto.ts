import { PostType } from "@/generated/prisma/enums";
import { feedRepository } from "./feed.repository";




export interface FeedPostProps {
  id: string;
  type: PostType;
  view: number;
  title: string;
  slug: string;
  description: string;
  createdAt: Date | string;
  nextCursor:string
  author: {
    id: string;
    username: string | null;
    avatar: string | null;
  };
  assets: {
    id: string;
    fileUrl: string;
  }[];
}

export interface FeedMetaProps {
  Feeds: FeedPostProps[];
  NextCursor: string | null;
}

export type RawFeedPost = Awaited<ReturnType<typeof feedRepository.getRawFeedPost>>;

export const toFeedDto = (rawFeed: RawFeedPost) : FeedMetaProps => {
  const feedData = rawFeed.map((item)=> {
    return {
      id:item.id,
      type:item.type,
      view:item.viewCount,
      title:item.title,
      slug:item.slug,
      description:item.description,
      createdAt:item.createdAt,
      nextCursor:item.id,
      author:{
        id:item.author.id,
        username:item.author.profile?.userName ?? null,
        avatar:item.author.imageUrl
      },
      assets:item.assets.map((asset)=>{
        return {
          id:asset.id,
          fileUrl:asset.fileUrl
        }
      })
    }
  })
  return {
    Feeds:feedData,
    NextCursor:feedData[feedData.length-1].id,
  }
}