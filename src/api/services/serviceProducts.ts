import { ProductsSchema } from '@/types/products.schema.ts'
import {fechApiUrl} from '../instance.ts'

export  async function  getProductByCategory(category:string){
    // Para traer solo el nombre &_fields=title
    const res =await fechApiUrl(`/freshcoffee_products?freshcoffee_category_slug=${category}&per_page=20`)
    const {data} = ProductsSchema.safeParse(res)
    
    
    return data
}