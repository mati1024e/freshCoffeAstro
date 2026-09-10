import { guestCredentials } from "./dal"


export const  loginUser  = async ()=>{
    const res = await fetch(`${import.meta.env.AUTH_URL}`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(guestCredentials)
    })
    const json = await res.json()
    return json
}