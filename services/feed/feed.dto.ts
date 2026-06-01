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
export interface FeedDetailProps {
  id: string;
  type: PostType;
  view: number;
  title: string;
  slug: string;
  description: string;
  createdAt: Date | string;
  author: {
    id: string;
    username: string | null;
    avatar: string | null;
  };
  assets?: {
    id: string;
    fileUrl: string;
  }[];
}

export interface FeedMetaProps {
  Feeds: FeedPostProps[];
  NextCursor: string | undefined;
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
    NextCursor:feedData.length >= 10 ? feedData[9].id : undefined,
  }
}

export type RawDetailFeedPost = Awaited<ReturnType<typeof feedRepository.getDetailFeed>>;

export const toDetailFeedDto = (rawFeed: RawDetailFeedPost): FeedDetailProps | null => {
  if(!rawFeed) return null
  return {
    id: rawFeed.id,
    type: rawFeed.type,
    view: rawFeed.viewCount,
    title: rawFeed.title,
    slug: rawFeed.slug,
    description: rawFeed.description,
    createdAt: rawFeed.createdAt,
    author: {
      id: rawFeed.author.id,
      username: rawFeed.author.profile?.userName ?? null,
      avatar: rawFeed.author.imageUrl
    },
    assets: rawFeed.assets.map((asset) => {
      return {
        id: asset.id,
        fileUrl: asset.fileUrl
      }
    })
  }
}