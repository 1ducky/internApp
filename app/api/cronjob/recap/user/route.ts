import prisma from "@/libs/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    const cronSecret = process.env.CRON_SECRET?.trim();
    const token = authHeader?.split(' ')[1].trim()

    if (!cronSecret || token !== cronSecret) {
        return Response.json({ message: "Unauthorized" }, { status: 401 })
    }
}