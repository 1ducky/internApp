
import { toDetailFeedDto, toFeedDto } from "./feed.dto";
import { feedRepository } from "./feed.repository";

export const feedServices = {
  getFeed,
  getDetailFeed
}

async function getFeed(nextCursor?:string ) {
  const db = await feedRepository.getRawFeedPost(nextCursor)

  return toFeedDto(db);
}

async function getDetailFeed(slug:string) {
  const db = await feedRepository.getDetailFeed(slug)

  return toDetailFeedDto(db);
}