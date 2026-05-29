
import { toFeedDto } from "./feed.dto";
import { feedRepository } from "./feed.repository";

export const feedServices = {
  getFeed
}

async function getFeed(nextCursor?:string ) {
  const db = await feedRepository.getRawFeedPost(nextCursor)

  return toFeedDto(db);
}