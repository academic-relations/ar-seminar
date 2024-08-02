import { ActivityCertificateOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/activityCertificate.enum";
import { CommonSpaceUsageOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/commonSpace.enum";
import {
  PromotionalPrintingOrderStatusEnum,
  PromotionalPrintingSizeEnum,
} from "@sparcs-clubs/interface/common/enum/promotionalPrinting.enum";
import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";

import { ApiRnt003ResponseOK } from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt003";
import { ApiAcf003ResponseOk } from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf003";

const chachaMockUpMyRental: ApiRnt003ResponseOK = {
  items: [
    {
      id: 1,
      studentName: "차차",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "박스",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Applied,
      desiredStart: "2024-06-01",
      desiredEnd: "2024-07-01",
      startDate: "2024-05-01",
      endDate: "2024-08-01",
      createdAt: "2024-05-15",
    },
    {
      id: 2,
      studentName: "초초",
      objects: [
        {
          id: 1,
          name: "현수막",
          number: 5,
        },
        {
          id: 2,
          name: "돗자리",
          number: 1,
        },
        {
          id: 3,
          name: "도구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Approved,
      desiredStart: "2024-06-01",
      desiredEnd: "2024-07-01",
      startDate: "2024-05-01",
      endDate: "2024-08-01",
      createdAt: "2024-05-15",
    },
    {
      id: 3,
      studentName: "채채",
      objects: [
        {
          id: 1,
          name: "도구",
          number: 5,
        },
        {
          id: 2,
          name: "도구",
          number: 1,
        },
        {
          id: 3,
          name: "도구",
          number: 1,
        },
        {
          id: 4,
          name: "도구",
          number: 5,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Returned,
      desiredStart: "2024-06-01",
      desiredEnd: "2024-07-01",
      startDate: "2024-05-01",
      endDate: "2024-08-01",
      createdAt: "2024-05-15",
    },
  ],
  total: 3,
  offset: 3,
};

const chachaMockUpMyAcf: ApiAcf003ResponseOk = {
  items: [
    {
      id: 1,
      studentName: "차차",
      issuedNumber: 10,
      statusEnum: ActivityCertificateOrderStatusEnum.Rejected,
      createdAt: new Date(),
    },
    {
      id: 2,
      studentName: "채채",
      issuedNumber: 20,
      statusEnum: ActivityCertificateOrderStatusEnum.Approved,
      createdAt: new Date(),
    },
  ],
  total: 1,
  offset: 1,
};

export { chachaMockUpMyRental, chachaMockUpMyAcf };
