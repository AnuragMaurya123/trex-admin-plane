
import { z } from "zod"

export const variablesSchema = z.object({
  catergory: z.string().array().optional(),
  subCatergory: z.string().array().optional(),
  color: z.string().array().optional(),
  occassion: z.string().array().optional(),
  patternAndPrint: z.string().array().optional(),
  style: z.string().array().optional(),
  sizes: z.string().array().optional(),
  fabric: z.string().array().optional(),
})

export type variablesFormValues = z.infer<typeof variablesSchema>



