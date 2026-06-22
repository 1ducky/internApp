import { cacheTag, revokeCache } from "@/libs/cache";
import { AuthGuard } from "@/services/auth/auth.helper";
import { userService } from "@/services/user/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { status, role } = await request.json()
    const { id } = await params
    const auth = await AuthGuard({ role: ['ADMIN'], permissions: ['user:update', 'user:banning', 'user:unbanning'] })
    if (!auth.success) return NextResponse.json({ success: false, status: auth.status, message: auth.message })


    const data = await userService.ChangeUserAuthorizedFromId(id, status, role)
    if (data.success) revokeCache(cacheTag.user.all())
    return NextResponse.json(data, { status: data.status })
}