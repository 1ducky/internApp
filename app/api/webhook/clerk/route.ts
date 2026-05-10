import { clerkWebhookDispatcher } from "@/services/webhook/clerk/clerk.dispatcher"
import { verifyWebhook } from "@clerk/nextjs/webhooks"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const signingSecret =
        process.env.CLERK_WEBHOOK_SIGNING_SECRET

    if (!signingSecret) {
        throw new Error(
            "Missing CLERK_WEBHOOK_SIGNING_SECRET"
        )
    }

    try {
        const evt = await verifyWebhook(request, {
            signingSecret,
        })
        

        const data = await clerkWebhookDispatcher(evt)

        console.log(data)

        return NextResponse.json(
            { success: true },
            { status: 200 }
        )
    } catch (err) {
        console.error("Webhook verification failed", err)

        return NextResponse.json(
            { error: "Invalid webhook" },
            { status: 400 }
        )
    }
}