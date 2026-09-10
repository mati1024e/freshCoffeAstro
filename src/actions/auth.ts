import { guestCredentials } from "@/api/services/dal";
import { loginUser } from "@/api/services/serviceAuth";
import { defineAction } from "astro:actions";


export const auth ={
    signInAsGuest:defineAction({
        handler:async(input,ctx) => {
           const data = await loginUser()
           
           //Context
           ctx.cookies.set('FRESHCOFFEE_TOKEN',data.token,{
            httpOnly:true,//=> hace que no puedas acceder la cookie medientes JS
            sameSite:'strict',
            path:'/',
            maxAge:60*60*24*1
           })
           
           return true
        }
    })
}