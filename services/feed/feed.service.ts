
import { toDetailFeedDto, toFeedDto } from "./feed.dto";
import { feedRepository } from "./feed.repository";

export const feedServices = {
  getFeed,
  getDetailFeed,
  getOwnFeed
}

async function getFeed(nextCursor?:string ) {
  const db = await feedRepository.getRawFeedPost(nextCursor)

  return toFeedDto(db);
}
async function getOwnFeed(userId:string,nextCursor?:string ) {
  const db = await feedRepository.getRawOwnFeed(userId,nextCursor)

  return toFeedDto(db);
}

async function getDetailFeed(slug:string) {
  const db = await feedRepository.getDetailFeed(slug)

  return toDetailFeedDto(db);
}