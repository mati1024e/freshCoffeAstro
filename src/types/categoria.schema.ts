import { z } from "astro/zod";

const CategorySchema = z.object({
    id: z.number(),
    name:z.string(),
    slug:z.string(),
    acf:z.object({
        icono:z.string()
    })
})

export const CategoriesSchema = z.array(CategorySchema)
export  type Categoria = z.infer<typeof CategorySchema>