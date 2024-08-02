import { ActivityCertificateOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/activityCertificate.enum";
import { CommonSpaceUsageOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/commonSpace.enum";
import {
  PromotionalPrintingOrderStatusEnum,
  PromotionalPrintingSizeEnum,
} from "@sparcs-clubs/interface/common/enum/promotionalPrinting.enum";
import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";

import { ApiRnt003ResponseOK } from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt003";
import { ApiAcf003ResponseOk } from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf003";
import { ApiCms006ResponseOk } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms006";
import { ApiPrt001ResponseOk } from "@sparcs-clubs/interface/api/printing-business/endpoint/apiPrt001";

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
    {
      id: 4,
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
      statusEnum: RentalOrderStatusEnum.Rented,
      desiredStart: "2024-06-01",
      desiredEnd: "2024-07-01",
      startDate: "2024-05-01",
      endDate: "2024-08-01",
      createdAt: "2024-05-15",
    },
  ],
  total: 4,
  offset: 4,
};

const chachaMockUpMyAcf: ApiAcf003ResponseOk = {
  items: [
    {
      id: 1,
      studentName: "차차",
      issuedNumber: -10,
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
    {
      id: 3,
      studentName: "초초",
      issuedNumber: 20,
      statusEnum: ActivityCertificateOrderStatusEnum.Applied,
      createdAt: new Date(),
    },
    {
      id: 4,
      studentName: "채채",
      issuedNumber: 1000000000,
      statusEnum: ActivityCertificateOrderStatusEnum.Received,
      createdAt: new Date(),
    },
    {
      id: 5,
      studentName: "채채",
      issuedNumber: 1000000000,
      statusEnum: ActivityCertificateOrderStatusEnum.Issued,
      createdAt: new Date(),
    },
  ],
  total: 5,
  offset: 5,
};

const chachaMockUpMyCms: ApiCms006ResponseOk = {
  items: [
    {
      orderId: 1,
      statusEnum: CommonSpaceUsageOrderStatusEnum.Applied,
      spaceName: "공간-1",
      chargeStudentName: "차차",
      startTerm: "2024-01-01",
      endTerm: "2024-12-01",
      createdAt: new Date(),
    },
    {
      orderId: 2,
      statusEnum: CommonSpaceUsageOrderStatusEnum.Canceled,
      spaceName: "공간-2",
      chargeStudentName: "초초",
      startTerm: "2024-05-05",
      endTerm: "2024-12-01",
      createdAt: new Date(),
    },
    {
      orderId: 3,
      statusEnum: CommonSpaceUsageOrderStatusEnum.Used,
      spaceName: "공간-3",
      chargeStudentName: "치치",
      startTerm: "2024-10-10",
      endTerm: "2024-12-01",
      createdAt: new Date(),
    },
  ],
  total: 3,
  offset: 3,
};

const chachaMockUpMyPrint: ApiPrt001ResponseOk = {
  items: [
    {
      id: 1,
      studentName: "차차",
      status: PromotionalPrintingOrderStatusEnum.Applied,
      orders: [
        {
          promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A4,
          numberOfPrints: 100000000,
        },
        {
          promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A3,
          numberOfPrints: 10,
        },
      ],
      desiredPickUpDate: new Date(),
      pickUpTime: new Date(),
      createdAt: new Date(),
    },
    {
      id: 2,
      studentName: "치치",
      status: PromotionalPrintingOrderStatusEnum.Printed,
      orders: [
        {
          promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A4,
          numberOfPrints: 1,
        },
      ],
      desiredPickUpDate: "2024-01-01 12:00:00",
      pickUpTime: "2024-01-01",
      createdAt: new Date(),
    },
    {
      id: 3,
      studentName: "차차",
      status: PromotionalPrintingOrderStatusEnum.Approved,
      orders: [
        {
          promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A4,
          numberOfPrints: 100000000,
        },
        {
          promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A3,
          numberOfPrints: 10,
        },
      ],
      desiredPickUpDate: new Date(),
      pickUpTime: new Date(),
      createdAt: new Date(),
    },
    {
      id: 4,
      studentName: "차차",
      status: PromotionalPrintingOrderStatusEnum.Received,
      orders: [
        {
          promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A4,
          numberOfPrints: 100000000,
        },
        {
          promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A3,
          numberOfPrints: 10,
        },
      ],
      desiredPickUpDate: new Date(),
      pickUpTime: new Date(),
      createdAt: new Date(),
    },
  ],
  total: 4,
  offset: 4,
};

export {
  chachaMockUpMyRental,
  chachaMockUpMyAcf,
  chachaMockUpMyCms,
  chachaMockUpMyPrint,
};
