import prisma from "@/libs/db"
import { SubmitPostInput } from "./post.schema"

export const postRepository = {
    CreatePost,
    updatePostById,
    deletePostById,
    getPostById,
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

async function updatePostById(userId:string, data:SubmitPostInput, id:string){
    const db = await prisma.post.updateMany({
        where:{
            id:id,
            authorId:userId
        },
        data:{
            ...data
        }
    })
    if(!db){
        return {success:false}
    }
    return {success:true, data:db}
}

async function deletePostById(userId:string, id:string){
    const db = await prisma.post.delete({
        where:{
            id:id,
            authorId:userId
        }
    })
    if(!db){
        return {success:false}
    }
    return {success:true,}
}

async function getPostById(id:string){
    const db = await prisma.post.findUnique({
        where:{
            id:id
        },
        select:{
            id:true,
            title:true,
            description:true,
            type:true,
            status:true,
            slug:true,
            authorId:true,
            viewCount:true,
            imageUrl:true,
            createdAt:true,
            updatedAt:true,
        }
    })
    if(!db){
        return {success:false}
    }return {success:true, data:db}
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
            authorId:true,
            viewCount:true,
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