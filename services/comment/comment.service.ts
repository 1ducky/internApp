import { toCommentDto, toCommentDtoSinggle } from "./comment.dto"
import { commentRepository } from "./comment.repository"

export const commentService = {
 addComment,
 getCommentsByPostId
}

async function addComment(userId:string,content:string,postId:string) {
    try{
        const res = await commentRepository.addComment({authorId:userId,content:content,postId:postId})
        return toCommentDtoSinggle(res)
    }catch(err){
        console.log(err)
        return null
    }
}

async function getCommentsByPostId(postId:string,nextCursor?:string) {
    try{
        const res = await commentRepository.getCommentByPostId(postId,nextCursor)
        return toCommentDto(res)
    }catch(err){
        console.log(err)
        return null
    }
}