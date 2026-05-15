import prisma from "@/libs/db"
import { ProfileSubmitInput } from "./profile.schema"

export const profileRepository = {
    getProfileByUserId
}

async function getProfileByUserId(id:string){
    const db = await prisma.userProfile.findUnique({
        where:{userId:id},
        select:{
            birthDate:true,
            bio:true,
            gender:true,
            phoneNumber:true,
            location:true
        }
    })
    if(!db) return { success:false}
    return {success:true, data:db}
}

async function submitProfile(data: ProfileSubmitInput){
    const db = await prisma.userProfile.upsert({
        where:{userId:data.userId},
        update: {
            birthDate:data.birthDate,
            bio:data.bio,
            gender:data.gender,
            phoneNumber:data.phoneNumber,
            location:data.location
        },
        create: {
            userId:data.userId,
            birthDate:data.birthDate,
            bio:data.bio,
            gender:data.gender,
            phoneNumber:data.phoneNumber,
            location:data.location
        }
    })
    if(!db) return { success:false}
    return {success:true, data:db}
}