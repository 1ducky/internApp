import { logger } from "@/infrastructure/lib/logger"
import { submitPostSchema } from "./post.schema"
import { failed, ok } from "@/utils/responseMapper"
import { postRepository } from "./post.repository"
import { slugify } from "@/utils/slugify"

export const postService = {
    submitPost,
    getUserAllPost
}

async function submitPost(user: UserPublicMetadata, body: unknown) {
    if(!user.id){
        logger.error(`User Id is not present`, 'Post Service')
        return failed(401,{'message:':'user not authenticated'},'Unauthorized')
    }
    logger.info(`Post submission request for user ${user.id}`, `Post Service`)    
    try {
        const validated = submitPostSchema.safeParse(body)
        if(validated.error){
            logger.error(`Post submission request for user ${user.id} is invalid`, 'Post Service',)
            return failed(400,validated.error.flatten().fieldErrors, 'Bad Request')
        }
        logger.info(`Post submission request for user ${user.id} is valid`, 'Post Service')
        validated.data.slug = slugify(validated.data.title)
        const res = await postRepository.CreatePost(user.id as string, validated.data)
        if(!res.success){
            logger.error(`Post submission request for user ${user.id} failed`, 'Post Service')
            return failed(500,'INTERNAL','internal')
        }
        logger.info(`Post submission request for user ${user.id} success`, 'Post Service')
        return ok(res.data,'Submited')
    } catch (error) {
        logger.error(`Post submission request for user ${user.id} Internak Error`, 'Post Service')
        console.log(error)
        return failed(500,'INTERNAL','internal')
    }
}


async function getUserAllPost(user:UserPublicMetadata){
    if(!user.id){
        logger.error(`User Id is not present`, 'Post Service')
        return failed(401,{'message:':'user not authenticated'},'Unauthorized')
    }
    logger.info(`Post submission request for user ${user.id}`, `Post Service`)
    try{
        const res = await postRepository.GetAllUserPost(user.id as string)
        if(!res.success){
            logger.error(`Post submission request for user ${user.id} failed`, 'Post Service')
            return failed(500,'INTERNAL','internal')
        }
        logger.info(`Post submission request for user ${user.id} success`, 'Post Service')
        return ok(res.data,'Submited')
    }catch(error){
        logger.error(`Post submission request for user ${user.id} failed`, 'Post Service')
        console.log(error)
        return failed(500,'INTERNAL','internal')
    }
}