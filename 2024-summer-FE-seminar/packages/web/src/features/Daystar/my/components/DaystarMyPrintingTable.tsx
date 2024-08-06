import React from "react";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { PrtTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formateDate";
import getPrintSize from "@sparcs-clubs/web/utils/getPrintSize";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import type { ApiPrt001ResponseOk } from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";

interface DaystarPrintingTableProps {
  printingList: ApiPrt001ResponseOk | undefined; // 밖에서 실제 요청 데이터 넣어서 쓰기 위해 undefined 허용
}

const DaystarMyPrintingTable: React.FC<DaystarPrintingTableProps> = (
  { printingList }, // AsyncBoundary 써도 될 것 같은데 그러면 printingList가 undefined일 수 있다고 에러가 뜨네요ㅠㅠ
) =>
  printingList === undefined ? (
    <div>Error!</div>
  ) : (
    <TableWrapper>
      <TableRow>
        <TableCell type="Header" width="10%" minWidth={90}>
          상태
        </TableCell>
        <TableCell type="Header" width="24%">
          신청 일시
        </TableCell>
        <TableCell type="Header" width="18%" minWidth={120}>
          동아리
        </TableCell>
        <TableCell type="Header" width="24%">
          수령 일시
        </TableCell>
        <TableCell type="Header" width="24%">
          인쇄 매수
        </TableCell>
      </TableRow>
      {printingList.items.map((printing, index) => {
        const { color, text } = getTagDetail(printing.status, PrtTagList);
        return (
          <TableRow isBorder key={printing.studentName + String(index)}>
            <TableCell type="Tag" width="10%" minWidth={90}>
              <Tag color={color}>{text}</Tag>
            </TableCell>
            <TableCell type="Default" width="24%">
              {formatDateTime(printing.createdAt)}
            </TableCell>
            <TableCell type="Default" width="18%" minWidth={120}>
              {printing.studentName}
            </TableCell>
            <TableCell type="Default" width="24%">
              {formatDateTime(printing.desiredPickUpDate)}
            </TableCell>
            <TableCell type="Default" width="24%">
              {printing.orders
                .sort(
                  (a, b) =>
                    b.promotionalPrintingSizeEnum -
                    a.promotionalPrintingSizeEnum,
                ) // TODO: 이렇게 하는 대신 그냥 보여주고 싶은 순서랑 enum을 맞추는게 나을 수도 있음
                .map(
                  order =>
                    `${getPrintSize(order.promotionalPrintingSizeEnum)} ${order.numberOfPrints}매`,
                )
                .join(", ")}
            </TableCell>
          </TableRow>
        );
      })}
    </TableWrapper>
  );

export default DaystarMyPrintingTable;
