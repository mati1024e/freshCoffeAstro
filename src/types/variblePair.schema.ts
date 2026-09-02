import { z } from "astro/zod";

export const VariablePairSchema = z.object({
    price:z.coerce.number(),
    size:z.string()
})

export const VariablePriceSchema =z.object({
    variable_price:z.literal(true),
    small:VariablePairSchema,
    medium:VariablePairSchema,
    large:VariablePairSchema
})

export const FixedPriceSchema = z.object({
    variable_price:z.literal(false),
    price: z.coerce.number()
})

