import { getAuthSessionClerk } from "@/services/clerk/clerk.session"


export async function GET() {
    const user = await getAuthSessionClerk()
    return new Response(JSON.stringify(user), {status: 200})
}