import { logger } from "@/infrastructure/lib/logger"
import { submitPostSchema } from "./post.schema"
import { failed, ok } from "@/utils/responseMapper"
import { postRepository } from "./post.repository"
import { slugify } from "@/utils/slugify"
import { toPostDto, toPostDtoList } from "./post.dto"

export const postService = {
    submitPost,
    updatePostById,
    deletePostById,
    getUserAllPost,
    getPostById
}

async function submitPost(userId: string, body: unknown) {
    logger.info(`Post submission request for user ${userId}`, `Post Service`)    
    try {
        const validated = submitPostSchema.safeParse(body)
        if(validated.error){
            logger.error(`Post submission request for user ${userId} is invalid`, 'Post Service',)
            return failed(400,validated.error.flatten().fieldErrors, 'Bad Request')
        }
        logger.info(`Post submission request for user ${userId} is valid`, 'Post Service')
        validated.data.slug = slugify(validated.data.title) + '-' + userId.slice(0,5)+ '-' + crypto.randomUUID()
        console.log(validated.data)
        const res = await postRepository.submitPostwithAssets(userId, validated.data)
        if(!res.success || !res.data){
            logger.error(`Post submission request for user ${userId} failed`, 'Post Service')
            return failed(500,'INTERNAL','internal')
        }
        logger.info(`Post submission request for user ${userId} success`, 'Post Service')
        return ok(toPostDto(res.data),'Submited')
    } catch (error) {
        logger.error(`Post submission request for user ${userId} Internak Error`, 'Post Service')
        console.log(error)
        return failed(500,'INTERNAL','catch internal')
    }
}


async function getUserAllPost(userId:string){
    if(!userId){
        logger.error(`User Id is not present`, 'Post Service')
        return failed(401,{'message:':'user not authenticated'},'Unauthorized')
    }
    logger.info(`Post submission request for user ${userId}`, `Post Service`)
    try{
        const res = await postRepository.GetAllUserPost(userId)
        if(!res.success || !res.data){
            logger.error(`Post submission request for user ${userId} failed`, 'Post Service')
            return failed(500,'INTERNAL','internal')
        }
        logger.info(`Post submission request for user ${userId} success`, 'Post Service')
        return ok(toPostDtoList(res.data),'Submited')
    }catch(error){
        logger.error(`Post submission request for user ${userId} failed`, 'Post Service')
        console.log(error)
        return failed(500,'INTERNAL','catch internal')
    }
}

async function getPostById(id:string){
    try{
        const res = await postRepository.getPostById(id)
        if(!res.success || !res.data){
            logger.error(`Get Post By Id request for post ${id} failed`, 'Post Service')
            return failed(404,'Post Not Found','Not Found')
        }
        logger.info(`Get Post By Id request for post ${id} success`, 'Post Service')
        return ok(toPostDto(res.data),'Post Found')
    }
    catch(error){
        logger.error(`Get Post By Id request for post ${id} failed`, 'Post Service')
        console.log(error)
        return failed(500,'INTERNAL','catch internal')
    }
}

async function updatePostById(userId:string, body:unknown, id:string){
    if(!userId){
        logger.error(`User Id is not present`, 'Post Service')
        return failed(401,{'message:':'user not authenticated'},'Unauthorized')
    }
    logger.info(`Post update request for user ${userId}`, `Post Service`)
    try {
        const validated = submitPostSchema.safeParse(body)
        if(validated.error){
            logger.error(`Post update request for user ${userId} is invalid`, 'Post Service',)
            return failed(400,validated.error.flatten().fieldErrors, 'Bad Request')
        }
        logger.info(`Post update request for user ${userId} is valid`, 'Post Service')
        validated.data.slug = slugify(validated.data.title) + '-' + userId.slice(0,5)+ '-' + crypto.randomUUID()
        console.log(validated.data)
        const res = await postRepository.updatePostByIdWithAssets(userId as string, validated.data,id)
        if(!res.success){
            logger.error(`Post update request for user ${userId} failed`, 'Post Service')
            return failed(500,'INTERNAL','internal')
        }
        logger.info(`Post update request for user ${userId} success`, 'Post Service')
        return ok(res.data,'Updated')
    } catch (error) {
        logger.error(`Post update request for user ${userId} Internak Error`, 'Post Service')
        console.log(error)
        return failed(500,'INTERNAL','catch internal')
    }
}

async function deletePostById(userId:string, id:string){
    if(!userId){
        logger.error(`User Id is not present`, 'Post Service')
        return failed(401,{'message:':'user not authenticated'},'Unauthorized')
    }
    logger.info(`Post delete request for user ${userId}`, `Post Service`)
    try {
        const res = await postRepository.deletePostByIdwithAsstes(userId as string, id)
        if(!res.success){
            logger.error(`Post delete request for user ${userId} failed`, 'Post Service')
            return failed(500,'INTERNAL','internal')
        }
        logger.info(`Post delete request for user ${userId} success`, 'Post Service')
        return ok({message:'successfuly deleted'},'Deleted')
    } catch (error) {
        logger.error(`Post delete request for user ${userId} Internak Error`, 'Post Service')
        console.log(error)
        return failed(500,'INTERNAL','catch internal')
    }
}