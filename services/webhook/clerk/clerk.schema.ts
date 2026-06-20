import { WebhookEvent } from "@clerk/nextjs/server"
import z from "zod"

export function normalizeClerkUser(evt: WebhookEvent) {
  if (evt.type === 'user.created') {
    const user = evt.data
    return {
      clerkId: user.id,
      username: user.username,
      email: user.email_addresses[0].email_address,
      imageUrl: user.image_url,
      isBanned: user.banned,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    }
  } else if (evt.type === 'user.updated') {
    const user = evt.data
    return {
      clerkId: user.id,
      username: user.username,
      email: user.email_addresses[0].email_address,
      imageUrl: user.image_url,
      isBanned: user.banned,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    }
  } else if (evt.type === 'user.deleted') {
    const user = evt.data
    return {
      clerkId: user.id,
    }
  } else if (evt.type === 'session.created') {
    const user = evt.data.user
    return {
      clerkId: user?.id,
      username: user?.username,
      email: user?.email_addresses[0].email_address,
      imageUrl: user?.image_url,
      isBanned: user?.banned,
      createdAt: new Date(user?.created_at as number),
      updatedAt: new Date(user?.updated_at as number),
    }
  }
}

export const userCreatedSchema = z.object({
  clerkId: z.string(),
  username: z.string().nullish().optional(),
  email: z.string(),
  imageUrl: z.string(),
  isBanned: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const userUpdatedSchema = z.object({
  clerkId: z.string(),
  username: z.string().nullish().optional(),
  email: z.string(),
  imageUrl: z.string(),
  isBanned: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const userDeletedSchema = z.object({
  clerkId: z.string(),
})

export const userMetaDataSchema = z.object({
  role: z.string(),
  id: z.string(),
  status: z.string()
})

export type UserMetaDataInput = z.infer<typeof userMetaDataSchema>
export type UserCreatedInput = z.infer<typeof userCreatedSchema>
export type UserUpdatedInput = z.infer<typeof userUpdatedSchema>
export type UserDeletedInput = z.infer<typeof userDeletedSchema>