import z from "zod";

export const createTransactionsSchema = z.object({
  avatar: z.string().url("Avatar deve ser uma URL válida").optional(),
  name: z.string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome não pode ter mais de 100 caracteres"),
  category: z.string()
    .min(1, "Categoria é obrigatória")
    .max(50, "Categoria não pode ter mais de 50 caracteres"),
  date: z.string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      "Data deve ser uma data válida em formato ISO"
    ),
  amount: z.number()
    .positive("Valor deve ser maior que 0")
    .max(999999.99, "Valor máximo é 999.999,99"),
  recurring: z.boolean(),
});

export const getRecurringSchema = z.object({
  search: z.string().optional(),
  sort: z.string().optional(),
});

