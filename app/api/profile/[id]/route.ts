import { ProfileCache } from "@/services/profile/profile.cache";
import { profileService } from "@/services/profile/profile.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    console.log(id)
    // const res = await ProfileCache.publicProfile(id)()
    const res = await profileService.getPublicProfile(id)
    return NextResponse.json(res)

}