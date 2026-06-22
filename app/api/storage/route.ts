import { objectStorageService } from "@/services/objectStorage/obj.service";
import { NextRequest, NextResponse } from "next/server";
import { AuthGuard } from "@/services/auth/auth.helper";

export async function POST(req: NextRequest) {
    const user = await AuthGuard({ status: "ACTIVE" })
    if (!user.success || !user.data) return NextResponse.json(user, { status: user.status })
    const body = await req.json()
    const res = await objectStorageService.uploadBulkFileImage(body, user.data.userId)
    if (!res.success) {
        return NextResponse.json({ success: false, message: res.message })
    }
    return NextResponse.json({ success: true, message: res.message, data: res.data })
}