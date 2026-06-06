import { feedServices } from "@/services/feed/feed.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const query = await req.nextUrl.searchParams
    const cursor = query.get('cursor') ?? undefined
    const type = query.get('type') ?? 'FEED'
    const data = await feedServices.getFeed(cursor,type)
    return NextResponse.json({ annoucment: data }, { status: 200 })
}