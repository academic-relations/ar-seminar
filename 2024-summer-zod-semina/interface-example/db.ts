import { z } from "zod";

export const dbElement = z.object({
  value: z.coerce.number().min(0),
  updatedAt: z.coerce.date(),
});

export const twoPositiveIntegerParser = z.object({
  a: z.coerce.number().int().min(1),
  b: z.coerce.number().int().min(1),
});

export const getDbIndexParser = (dbLength: number) =>
  z.object({
    index: z.coerce
      .number()
      .int()
      .min(0)
      .max(dbLength - 1),
  });

export const dbPaginationQueryParser = z.object({
  startDate: z.optional(z.coerce.date()),
  endDate: z.optional(z.coerce.date()),
  pageOffset: z.coerce.number().int().min(1),
  itemCount: z.coerce.number().int().min(1),
});
