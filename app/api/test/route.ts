import { checkRateLimit } from "@/libs/unstableRateLimit";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    const body =await req.json()
    const id = body.id
    const { allowed, remaining, resetIn } = await checkRateLimit(id);

    if (!allowed) {
        return NextResponse.json(
        { error: "Too Many Requests", resetIn },
        {
            status: 429,
            headers: {
            "X-RateLimit-Remaining": String(remaining),
            "Retry-After": String(resetIn),
            },
        }
        );
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });
}