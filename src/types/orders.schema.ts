import { z } from "astro/zod";
import { SelectedProductSchema } from "./products.schema";

const OrderItemSchema = SelectedProductSchema.extend({
    quantity:z.number(),
    subtotal:z.number(),
    key:z.optional(z.string())
})

export type OrderItem = z.infer<typeof OrderItemSchema>