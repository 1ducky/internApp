'use client'

import { useUser } from "@clerk/nextjs";
import { hasPermission } from "@/services/auth/signup.services"

export default function TestPage(){
    const { user } = useUser()
    
    const role = user?.publicMetadata?.role
    

    if(!role ){
        return <div>Loading...</div>
    }
    const permission = hasPermission(role, "EDIT_PROFILE")
    if(!permission){
        return <div>
            403 Not Authorization
        </div>
    }
    
    return <div>Role: {role}</div>
}