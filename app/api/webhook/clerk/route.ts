import { logger } from "@/infrastructure/lib/logger"
import { clerkWebhookDispatcher } from "@/services/webhook/clerk/clerk.dispatcher"
import { failed } from "@/utils/responseMapper"
import { verifyWebhook } from "@clerk/nextjs/webhooks"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const signingSecret =
        process.env.CLERK_WEBHOOK_SIGNING_SECRET

    if (!signingSecret) {
        logger.error('Missing CLERK_WEBHOOK_SIGNING_SECRET', 'ClerkWebhookRoute')
        return NextResponse.json(failed(500, {message: 'Internal Server Error'}, 'Internal Server Error'), {status:500})
    }

    try {
        const evt = await verifyWebhook(request, {
            signingSecret,
        })
        

        const data = await clerkWebhookDispatcher(evt)
        logger.debug(data.message? data.message : '', 'ClerkWebhookRoute')

        if(data.success){
            logger.info(data.message? data.message + ' webhook  Processed' :  'WebHook Successfully Processed', 'ClerkWebhookRoute')
            return NextResponse.json({message: data.message}, {status: 200})
        }
        logger.error(data.message? data.message : 'Something went wrong', 'ClerkWebhookRoute->Fail')
        return NextResponse.json(failed(data.status, data.error, data.message ? data.message : 'Something went wrong'), {status: data.status})
    } catch {
        logger.error("Webhook verification failed", 'ClerkWebhookRoute->CatchBlock',)

        return NextResponse.json(
            { error: "Invalid webhook" },
            { status: 400 }
        )
    }
}