//DATA access Layer

import { verifyUser } from "./serviceAuth"

export const guestCredentials ={
    "username":import.meta.env.GUEST_USER,
    "password": import.meta.env.GUEST_PASSWORD
}

export const verifySession = async (token: string) =>{
    if(!token) return {user:null}
    const user = await verifyUser(token)
    return user
    
}