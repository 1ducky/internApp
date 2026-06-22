import { AuthGuard } from "@/services/auth/auth.helper";
import { userService } from "@/services/user/user.service";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        const session = await AuthGuard({ role: ['ADMIN'], permissions: ['user:management'], status: 'ACTIVE' })
        if (!session) {
            return NextResponse.json({
                success: false,
                status: 401,
                error_code: 'UNAUTHORIZED',
                message: 'Unauthorized'
            }, { status: 401 })
        }
        const { searchParams } = new URL(request.url)
        const limit = Number(searchParams.get('limit')) || undefined
        const cursor = searchParams.get('cursor') || undefined
        const email = searchParams.get('email') || undefined

        const user = await userService.getUserManagement(email, cursor, limit)

        return NextResponse.json(user, { status: 200 })
    } catch (e) {
        console.error(e)
        return NextResponse.json({
            success: false,
            status: 500,
            error_code: 'INTERNAL_ERROR',
            message: 'Internal Server Error'
        }, { status: 500 })
    }
}