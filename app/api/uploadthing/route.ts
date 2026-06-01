import { uploadRouter } from "@/libs/uploadThing";
import { createRouteHandler } from "uploadthing/next";

export const { GET, POST } = createRouteHandler({
    router: uploadRouter
})