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

export async function getProducts({cantPage,page}:{cantPage:number,page:number}) {
    const {fetchApi,jsonData} =  await fechApiUrl(`/freshcoffee_products?per_page=${cantPage}&page=${page}`)
    // const  statusRes = fetchApi.ok
    const products= ProductsSchema.parse(jsonData)
    // console.log(products)
    const totalPage = fetchApi.headers.get('X-WP-TotalPages')
   
  
    // console.log(totalPage)
    
    
    return {products,totalPage}
}