import { commentRepository } from "./comment.repository"

export interface CommentEntitty{
    id:string
    content:string
    date:Date 
    author:{
        id:string
        name:string | undefined
        avatar:string | undefined
    }
}

export interface CommentMetaProps {
  Comments: CommentEntitty[];
  NextCursor: string |null;
}

type rawComment = Awaited<ReturnType<typeof commentRepository.getCommentByPostId>>
type rawCommentSinggle = Awaited<ReturnType<typeof commentRepository.addComment>>

export const toCommentDto = (rawComment: rawComment) : CommentMetaProps => {
    const commentData = rawComment.map((item)=> {
        return {
            id:item.id,
            content:item.content,
            date:item.createdAt,
            nextCursor:item.id,
            author:{
                id:item.author.id,
                name:item.author.name ?? undefined,
                avatar:item.author.imageUrl ?? undefined
            }
        }
    })
    return {
        Comments:commentData,
        NextCursor:commentData.length >= 10 ? commentData[9].id : null,
    }
}

export const toCommentDtoSinggle = (rawComment: rawCommentSinggle) : CommentEntitty => {
    return {
        id:rawComment.id,
        content:rawComment.content,
        date:rawComment.createdAt,
        author:{
            id:rawComment.author.id,
            name:rawComment.author.name ?? undefined,
            avatar:rawComment.author.imageUrl ?? undefined
        }
    }
}