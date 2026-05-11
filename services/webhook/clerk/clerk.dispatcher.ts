import { WebhookEvent } from "@clerk/nextjs/server"
import { clerkService } from "./clerk.service";
import { logger } from "@/infrastructure/lib/logger";
import { ok } from "@/utils/responseMapper";

export const clerkWebhookDispatcher = async (evt: WebhookEvent) => {
    logger.debug(evt.type, 'ClerkWebhookDispatcher')
    switch (evt.type) {
        case "user.created":
            return clerkService.userCreated(evt);
        case "user.updated":
            return clerkService.userUpdated(evt);
        case "user.deleted":
            return clerkService.userDeleted(evt);
        default:
            logger.info(`No handler for event type ${evt.type}`, 'ClerkWebhookDispatcher')
            return ok(null, `No handler for event type ${evt.type}`)
    }
}
