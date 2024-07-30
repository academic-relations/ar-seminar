import { z } from "zod";

export const dbElement = z.object({
    // { value: 0 이샹의 정수, updatedAt: ts date 타입 }
    value: z.coerce.number().int().nonnegative(),
    updatedAt: z.coerce.date(),
});

export const twoPositiveIntegerParser = z.object({
    // { a: 양의 정수, b: 양의 정수 }
    a: z.coerce.number().int().min(1),
    b: z.coerce.number().int().min(1),
});

export const getDbIndexParser = (dbLength: number) =>
    z.object({
        // db의 크기를 받아 db 범위 내의 인덱스만을 값으로 받는 parser를 만들어 주세요
        // { index: int, 0 <= index <= db_max_index}
        index: z.coerce.number().int().min(0).max(dbLength - 1),
    });

export const dbPaginationQueryParser = z.object({
    // 페이지네이션을 위한 parameter들을 정의해 주세요
    //  {   startDate, endDate: db의 updatedAt을 통해 filter하기 위한 옵션들입니다. optional합니다.
    //      pageOffset: int, >= 1
    //      itemCount: int, >= 1
    //  },
    startDate: z.optional(z.coerce.date()),
    endDate: z.optional(z.coerce.date()),
    pageOffset: z.coerce.number().int().min(1),
    itemCount: z.coerce.number().int().min(1),
});
