import { CategoriesSchema } from '@/types/categoria.schema.ts'
import {fechApiUrl} from '../instance.ts'
export async function getCategoryProducts() {
    const dataFetch =await fechApiUrl("/freshcoffee_categories")
    const {data,error} = CategoriesSchema.safeParse(dataFetch)
   
    return data
}