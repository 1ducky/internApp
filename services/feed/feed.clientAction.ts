'use server'

import { feedServices } from "./feed.service";

export async function getFeed(nextCursor?:string ) {
  return feedServices.getFeed(nextCursor)
}