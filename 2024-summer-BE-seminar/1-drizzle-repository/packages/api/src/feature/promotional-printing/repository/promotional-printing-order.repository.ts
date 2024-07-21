import { Inject, Injectable } from "@nestjs/common";
import { PromotionalPrintingOrderStatusEnum as Status } from "@sparcs-clubs/interface/common/enum/promotionalPrinting.enum";
import { and, count, desc, eq, gte, lte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
import { Student } from "@sparcs-clubs/api/drizzle/schema/user.schema";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import {
  PromotionalPrintingOrder,
  PromotionalPrintingOrderSize,
} from "src/drizzle/schema/promotional-printing.schema";

import type {
  GetStudentPromotionalPrintingsOrdersMyReturn,
  GetStudentPromotionalPrintingsOrdersReturn,
  PostStudentPromotionalPrintingsOrderParam,
} from "../dto/promotional-printing.dto";

@Injectable()
export class PromotionalPrintingOrderRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async countByStudentIdAndCreatedAtIn(
    studentId: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<number> {
    const numberOfOrders = (
      await this.db
        .select({ count: count() })
        .from(PromotionalPrintingOrder)
        .where(
          and(
            eq(PromotionalPrintingOrder.studentId, studentId),
            startDate !== undefined
              ? gte(PromotionalPrintingOrder.createdAt, startDate)
              : undefined,
            endDate !== undefined
              ? lte(PromotionalPrintingOrder.createdAt, endDate)
              : undefined,
          ),
        )
    ).at(0).count;

    return numberOfOrders;
  }

  async countByCreatedAtIn(startDate?: Date, endDate?: Date): Promise<number> {
    const numberOfOrders = (
      await this.db
        .select({ count: count() })
        .from(PromotionalPrintingOrder)
        .where(
          and(
            startDate !== undefined
              ? gte(PromotionalPrintingOrder.createdAt, startDate)
              : undefined,
            endDate !== undefined
              ? lte(PromotionalPrintingOrder.createdAt, endDate)
              : undefined,
          ),
        )
    ).at(0).count;

    return numberOfOrders;
  }

  async findByOrderId(orderId: number) {
    const orders = await this.db
      .select()
      .from(PromotionalPrintingOrder)
      .where(eq(PromotionalPrintingOrder.id, orderId));

    return orders;
  }

  async getStudentPromotionalPrintingsOrders(
    clubId: number,
    pageOffset: number,
    itemCount: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<GetStudentPromotionalPrintingsOrdersReturn> {
    const startIndex = (pageOffset - 1) * itemCount + 1;
    const orders = await this.db
      .select({
        id: PromotionalPrintingOrder.id,
        studentName: Student.name,
        status: PromotionalPrintingOrder.promotionalPrintingOrderStatusEnum,
        desiredPickUpDate: PromotionalPrintingOrder.desiredPickUpTime,
        pickUpTime: PromotionalPrintingOrder.pickUpAt,
        createdAt: PromotionalPrintingOrder.createdAt,
      })
      .from(PromotionalPrintingOrder)
      .leftJoin(Student, eq(PromotionalPrintingOrder.studentId, Student.id))
      .where(
        and(
          eq(PromotionalPrintingOrder.clubId, clubId),
          startDate !== undefined
            ? gte(PromotionalPrintingOrder.createdAt, startDate)
            : undefined,
          endDate !== undefined
            ? lte(PromotionalPrintingOrder.createdAt, endDate)
            : undefined,
        ),
      )
      .orderBy(desc(PromotionalPrintingOrder.createdAt))
      .limit(itemCount)
      .offset(startIndex - 1);

    return orders;
  }

  async postStudentPromotionalPrintingsOrder(
    parameter: PostStudentPromotionalPrintingsOrderParam,
  ) {
    // HW2: 설계한 DB 스키마에 적절하 값을 집어넣을 수 있는 쿼리를 구현하세요.
    await this.db.transaction(async tx => {
      // HW2-1: PromotionalPrintingOrder 스키마에 insert를 수행해야 합니다.
      // studentId는 임의의 값인 studentId = 1을 이용하세요.
      // 여러분의 로컬 DB는 완전히 비어있는 상태이기 때문에, user table과 student, 그리고 club 테이블에 1개씩 테스트용 값을 집어넣어야 합니다.
      const [orderInsertResult] = await tx
        .insert(PromotionalPrintingOrder)
        .values({
          clubId: parameter.clubId,
          studentId: 1,
          studentPhoneNumber: parameter.krPhoneNumber,
          promotionalPrintingOrderStatusEnum: Status.Applied,
          documentFileLink: parameter.documentFileLink,
          isColorPrint: parameter.isColorPrint,
          fitPrintSizeToPaper: parameter.fitPrintSizeToPaper,
          requireMarginChopping: parameter.requireMarginChopping,
          desiredPickUpTime: parameter.desiredPickUpTime,
        });
      if (orderInsertResult.affectedRows !== 1) {
        logger.debug("[postStudentPromotionalPrintingsOrder] rollback occurs");
        tx.rollback();
      }

      logger.debug(
        `[postStudentPromotionalPrintingsOrder] PromotionalPrintingOrder inserted with id ${orderInsertResult.insertId}`,
      );

      // HW2-2: PromotionalPrintingOrderSize 스키마에 insert를 수행해야 합니다.
      // 아래 skeleton 코드는 foreach를 통해 여러번의 insertion을 수행해야 합니다.
      // foreach를 통해 insert하는것은 좋은 선택은 아닙니다. 반복 횟수가 매우 적어 대충 짠 코드이니 다른데서 활용하지 말아주세요...ㅎ
      parameter.orders.forEach(async order => {
        const [sizeInsertResult] = await tx
          .insert(PromotionalPrintingOrderSize)
          .values({
            promotionalPrintingOrderId: orderInsertResult.insertId,
            promotionalPrintingSizeEnumId: order.promotionalPrintingSizeEnum,
            numberOfPrints: order.numberOfPrints,
          });
        if (sizeInsertResult.affectedRows !== 1) {
          logger.debug(
            "[postStudentPromotionalPrintingsOrder] rollback occurs",
          );
          tx.rollback();
        }
      });
    });
    logger.debug(
      "[postStudentPromotionalPrintingsOrder] insertion ends successfully",
    );

    return {};
  }

  async getStudentPromotionalPrintingsOrdersMy(
    studentId: number,
    pageOffset: number,
    itemCount: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<GetStudentPromotionalPrintingsOrdersMyReturn> {
    // HW3: GetStudentPromotionalPrintingsOrdersMyReturn 타입에 알맞게 페이지네이션을 구현하세요. 
    // hint: PromotionalPrintingOrder 스키마와 Student 스키마를 studentId를 통해 join하여 정보를 select해와야 합니다.
    const offset = (pageOffset - 1) * itemCount;
    const orders = // ???

    return orders;
  }
}
