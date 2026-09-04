import { ProductsSchema, type ProductWithVariablePrice } from '@/types/products.schema.ts'
import {fechApiUrl} from '../instance.ts'

export  async function  getProductByCategory(category:string){
    // Para traer solo el nombre &_fields=title
    const res =await fechApiUrl(`/freshcoffee_products?freshcoffee_category_slug=${category}&per_page=20`)
    const {data,error} = ProductsSchema.safeParse(res)
    // console.log(error)
    
    return data
}

export async function getProductByID(idProduct:string) {
    
    const res =await fechApiUrl(`/freshcoffee_products/${idProduct}`)
    
    return res
}

export async function getFetchApiAstroProduct(idProduct:string) {
    const res = await fetch(`/api/products/${idProduct}`)
    const data = await res.json() as ProductWithVariablePrice
    // console.log(data)
    
    return data
}