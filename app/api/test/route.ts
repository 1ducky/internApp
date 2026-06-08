import { feedServices } from "@/services/feed/feed.service";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const query = await req.nextUrl.searchParams
    const cursor = query.get('cursor') ?? undefined
    const take = parseInt(query.get('take') ?? '10')
    const type = query.get('type') ?? undefined
    const userid = query.get('userId') ?? undefined
    console.log(cursor, type, take, userid)

    const feed = await feedServices.getFeed(cursor, type, take, userid)
    return NextResponse.json({ message: "Success", data: feed }, { status: 200 });
}
