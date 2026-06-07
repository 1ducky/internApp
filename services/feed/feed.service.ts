import { toDetailFeedDto, toFeedDto } from "./feed.dto";
import { feedRepository } from "./feed.repository";
import { typeEnum } from "./feed.schema";

export const feedServices = {
  getFeed,
  getDetailFeed,
  getOwnFeed
}

async function getFeed(nextCursor?:string,type:string='FEED',take:number=10 ) {
  const validtype = typeEnum.parse(type)
  const db = await feedRepository.getRawFeedPost(nextCursor,validtype,take)

  return toFeedDto(db);
}
async function getOwnFeed(userId:string,nextCursor?:string,type?:string,take:number=10) {
  const validtype = type ? typeEnum.parse(type) : undefined
  const db = await feedRepository.getRawOwnFeed(userId,nextCursor,validtype,take)

  return toFeedDto(db);
}

async function getDetailFeed(slug:string) {
  const db = await feedRepository.getDetailFeed(slug)

  return toDetailFeedDto(db);
}