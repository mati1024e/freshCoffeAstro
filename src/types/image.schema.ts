import { z } from "astro/zod";

export const ImageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

export const FeaturedImageSchema = z.object({
  thumbnail: ImageSchema,
  medium: ImageSchema,
  medium_large: ImageSchema,
  large: ImageSchema,
  full: ImageSchema
});