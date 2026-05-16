import { failed, ok } from "@/utils/responseMapper";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function getClerkUserMetaData(req: NextRequest){
    const session = await getAuth(req)
    
    if (!session || !session.userId) {
        return failed(401,'UNAUTHORIZED','unauthorized')
    }
    const client = await clerkClient()
    const user = await client.users.getUser(session.userId)
    return ok(user.publicMetadata,'Successfuly get User Metadata')
}