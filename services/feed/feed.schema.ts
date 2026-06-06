import { PostType } from "@/generated/prisma/enums";
import z from "zod";

export const typeEnum = z.enum([PostType.FEED, PostType.EVENT, PostType.DISCUSSION, PostType.NEWS, PostType.ANNOUNCEMENT]).catch(PostType.FEED)