import {
  boolean,
  datetime,
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { Club } from "./club.schema";
import { Student } from "./user.schema";

/** 
 * # HW1
 * DB 설계에 맞추어 drizzle schema를 구현해 봅시다.
 * 진행 중 아무리 검색하고 고민해 보아도 해결되지 않는 점이 있다면,
 * `promotional-printing.schema copy.ts` 파일을 참고하세요.
 */

export const PromotionalPrintingOrderStatusEnum = mysqlTable(
  "promotional_printing_order_status_enum",
  {
    id: int('id').notNull().unique().primaryKey().autoincrement(),
    statusName: varchar('status_name', {length: 30}).notNull(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    deletedAt: timestamp('deleted_at')
  },
);

export const PromotionalPrintingSizeEnum = mysqlTable(
  "promotional_printing_size_enum",
  {
    id: int('id').notNull().unique().primaryKey().autoincrement(),
    printingSize: varchar('printing_size', {length: 30}).notNull(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
  },
);

// PromotionalPrintingOrder 테이블 정의
export const PromotionalPrintingOrder = mysqlTable(
  "promotional_printing_order",
  {

  },
  table => ({

  }),
);

export const PromotionalPrintingOrderSize = mysqlTable(
  "promotional_printing_order_size",
  {

  },
  table => ({

  }),
);
