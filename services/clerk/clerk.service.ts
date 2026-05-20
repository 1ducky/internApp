import { failed, ok } from "@/utils/responseMapper";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { logger } from "@/infrastructure/lib/logger";
import { PERMISSIONS_CONFIG, ROLES, ROLES_TYPE } from "@/config/auth/auth.config";

export async function getClerkUserMetaData(req: NextRequest){
    logger.info("Clerk user metadata received request", 'getClerkUserMetaData')
    const session = await getAuth(req)
    
    if (!session || !session.userId) {
        logger.error("Session not found", 'getClerkUserMetaData')
        return failed(401,'UNAUTHORIZED','unauthorized')
    }
    logger.info("Session received", 'getClerkUserMetaData')
    const client = await clerkClient()
    const user = await client.users.getUser(session.userId)
    return ok(user.publicMetadata,'Successfuly get User Metadata')
}

export function hasPermission(role: unknown, permission: string) {
    if (typeof role === 'string' && ROLES.includes(role as ROLES_TYPE)) {
        return PERMISSIONS_CONFIG[role as ROLES_TYPE].includes(permission)
    }
    return false
}