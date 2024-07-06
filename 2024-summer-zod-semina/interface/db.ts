import { z } from "zod";

export const dbElement = z.object({
  value: z.coerce.number().min(0),
  updatedAt: z.coerce.date(),
});

export const twoPositiveIntegerParser = z.object({
  // TODO1: 아래와 같이 2개의 양의 정수를 포함한 객체를 parsing하는 zod object를 구현하세요
  // { a: 양의 정수, b: 양의 정수 }
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
