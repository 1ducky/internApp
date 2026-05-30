import { commentRepository } from "./comment.repository"

export const commentService = {
 addComment
}

async function addComment(userId:string,content:string,postId:string,id:string) {
    try{
        const res = await commentRepository.addComment({authorId:userId,content:content,id:id,postId:postId})
        return res
    }catch(err){
        console.log(err)
        return null
    }
}