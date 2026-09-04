import { getProductByID } from '@/api/services/serviceProducts'
import type {APIRoute} from 'astro'

export const GET:APIRoute = async({params})=>{
    const json = await getProductByID(params.id!)

    return new Response(JSON.stringify(json))
}

//http://localhost:4321/api/products/1