import { z } from "astro/zod";
import { SelectedProductSchema } from "./products.schema";

export const OrderItemSchema = SelectedProductSchema.extend({
    quantity:z.number().min(1,{error:'Cantidad no validad'}),
    subtotal:z.number().min(1,{error:'Cantidad no validad'}),
    key:z.optional(z.string().min(1,{error:'Cantidad no validad'}))
})

export type OrderItem = z.infer<typeof OrderItemSchema>

export const OrderContentSchema = z.object({
    id:z.number(),
    title:z.string(),
    contents:z.string(),
    status: z.string(),
    total: z.number(),
    name: z.string(),

})

export type OrderContent = z.infer<typeof OrderContentSchema>