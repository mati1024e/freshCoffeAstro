import { z } from "astro/zod";
import { FeaturedImageSchema } from "./image.schema";
import { FixedPriceSchema, VariablePriceSchema } from "./variblePair.schema";

export const ProductPriceSchema = z.discriminatedUnion('variable_price',
    [VariablePriceSchema,FixedPriceSchema]
)

const ProductSchema = z.object({
    id:z.number(),
    slug:z.string(),
    title:z.object({
        rendered:z.string()
    }),
    featured_media:z.number(),
    featured_images:FeaturedImageSchema,
    acf: ProductPriceSchema,
    freshcoffee_category: z.object({
        id: z.number(),
        name:z.string(),
        slug:z.string()
    })
})

const  ProductWithVariablePriceSchema = ProductSchema.extend({
    acf:VariablePriceSchema
})

export const SelectedProductSchema = z.object({
    id:z.number(),
    name:z.string().min(1,{error:'El nombre del producto es obligatorio'}),
    price:z.number().min(1,{error:'Precio no valido'}),
    size:z.optional(z.string().min(1,{error:'Tamaño no valido'}))
})


export const ProductsSchema= z.array(ProductSchema)
export type Product = z.infer<typeof ProductSchema>
export type  ProductWithVariablePrice = z.infer<typeof ProductWithVariablePriceSchema>
export type  SelectedProduct = z.infer<typeof SelectedProductSchema >