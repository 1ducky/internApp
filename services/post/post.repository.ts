import prisma from "@/libs/db"
import { SubmitPostInput } from "./post.schema"

export const postRepository = {
    CreatePost,
    GetAllUserPost
}   

async function CreatePost(userId: string, data:SubmitPostInput) {
    const db = await prisma.post.create({
        data:{
            authorId: userId,
            ...data
        }
    })
    if(!db){
        return {success:false}
    }
    return {success:true, data:db}
}

async function GetAllUserPost(userId:string){
    const db = await prisma.post.findMany({
        where:{
            authorId:userId
        },
        select:{
            id:true,
            title:true,
            description:true,
            type:true,
            status:true,
            slug:true,
            imageUrl:true,
            createdAt:true,
            updatedAt:true,
        }
    })
    if(!db){
        return {success:false}
    }
    return {success:true, data:db}
}