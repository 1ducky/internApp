'use client'

import { useUser } from "@clerk/nextjs";

export default function TestPage(){
    const { user } = useUser()
    
    const role = user?.publicMetadata?.role

    if(!role){
        return <div>Loading...</div>
    }
    
    return <div>Role: {role}</div>
}