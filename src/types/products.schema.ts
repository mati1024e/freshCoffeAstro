import { z } from "astro/zod";
import { FeaturedImageSchema } from "./image.schema";


const ProductSchema = z.object({
    id:z.number(),
    slug:z.string(),
    title:z.object({
        rendered:z.string()
    }),
    featured_media:z.number(),
    featured_images:FeaturedImageSchema
})

export const ProductsSchema= z.array(ProductSchema)
export type Product = z.infer<typeof ProductSchema>