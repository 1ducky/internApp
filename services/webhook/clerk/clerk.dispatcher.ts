import { WebhookEvent } from "@clerk/nextjs/server"
import { clerkService } from "./clerk.service";

export const clerkWebhookDispatcher = async (evt: WebhookEvent) => {
    console.log(evt.type)
    switch (evt.type) {
        case "user.created":
            return clerkService.userCreated(evt);
        case "user.updated":
            return clerkService.userUpdated(evt);
        case "user.deleted":
            return clerkService.userDeleted(evt);
        default:
            console.log("Unknown event type", evt.type);
            return null;
    }
}
