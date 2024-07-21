import {
  boolean,
  datetime,
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
  foreignKey,
} from "drizzle-orm/mysql-core";

import { Club } from "./club.schema";
import { Student, StudentT } from "./user.schema";

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
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
    deletedAt: timestamp('deleted_at')
  },
);

export const PromotionalPrintingSizeEnum = mysqlTable(
  "promotional_printing_size_enum",
  {
    id: int('id').notNull().unique().primaryKey().autoincrement(),
    printingSize: varchar('printing_size', {length: 30}).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
  },
);

// PromotionalPrintingOrder 테이블 정의
export const PromotionalPrintingOrder = mysqlTable(
  "promotional_printing_order",
  {
    id: int('id').notNull().unique().primaryKey().autoincrement(),
    clubId: int('club_id').notNull().references(() => Club.id),
    studentId: int('student_id').notNull().references(() => StudentT.id),
    studentPhoneNumber: varchar('student_phone_number', {length: 30}),
    promotionalPrintingOrderStatusEnum: int('promotional_printing_order_status_enum').notNull(),
    documentFileLink: text('document_file_link'),
    isColorPrint: boolean('is_color_print').notNull().default(true),
    fitPrintSizeToPaper: boolean('fit_print_size_to_paper').notNull().default(true),
    requireMarginChopping: boolean('require_margin_chopping').notNull().default(false),
    desiredPickUpTime: datetime('desired_pick_up_time').notNull(),
    pickUpAt: datetime('pick_up_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
    deleted_at: timestamp('deleted_at')
  },
  // table => ({
  //   promotionalPrintingOrderStatusEnumRef: foreignKey({
  //     columns: [table.promotionalPrintingOrderStatusEnum],
  //     foreignColumns: [PromotionalPrintingOrderStatusEnum.id],
  //     name: 'promotional_printing_order_status_enum_fk'
  //   })
  // }),
);

export const PromotionalPrintingOrderSize = mysqlTable(
  "promotional_printing_order_size",
  {
    id: int('id').notNull().unique().primaryKey(),
    promotionalPrintingOrderId: varchar('promotional_printing_order_id', {length: 30}).notNull(),
    promotionalPrintingSizeEnumId: int('promotional_printing_size_enum_id').notNull(),
    numberOfPrints: int('number_of_prints').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
    deletedAt: timestamp('deleted_at')
  },
  // table => ({
  //   promotionalPrintingOrderIdRef: foreignKey({
  //     columns: [table.promotionalPrintingOrderId],
  //     foreignColumns: [PromotionalPrintingOrder.id],
  //     name: 'promotional_printing_order_id_fk'
  //   }),
  //   promotionalPrintingSizeEnumIdRef: foreignKey({
  //     columns: [table.promotionalPrintingSizeEnumId],
  //     foreignColumns: [PromotionalPrintingSizeEnum.id],
  //     name: 'promotional_printing_size_enum_id_fk',
  //   }),
  // }),
);
