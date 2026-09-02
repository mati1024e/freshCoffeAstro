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
    acf: ProductPriceSchema
})

const  ProductWithVariablePriceSchema = ProductSchema.extend({
    acf:VariablePriceSchema
})

export const SelectedProductSchema = z.object({
    id:z.number(),
    name:z.string(),
    price:z.number(),
    size:z.optional(z.string())
})


export const ProductsSchema= z.array(ProductSchema)
export type Product = z.infer<typeof ProductSchema>
export type  ProductWithVariablePrice = z.infer<typeof ProductWithVariablePriceSchema>
export type  SelectedProduct = z.infer<typeof SelectedProductSchema >