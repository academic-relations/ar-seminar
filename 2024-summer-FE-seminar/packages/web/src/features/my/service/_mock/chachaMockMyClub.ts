import { ActivityCertificateOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/activityCertificate.enum";
import { CommonSpaceUsageOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/commonSpace.enum";
import {
  PromotionalPrintingOrderStatusEnum,
  PromotionalPrintingSizeEnum,
} from "@sparcs-clubs/interface/common/enum/promotionalPrinting.enum";
import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";

const chachaMockUpMyRental: ApiRnt003ResponseOK = {
  items: [
    {
      id: 1,
      studentName: "차차",
      objects: [
        {
          id: 1,
          name: "도구1",
          number: 3,
        },
        {
          id: 2,
          name: "도구2",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Applied,
      desiredStart: "2024-05-01",
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 2,
      studentName: "초초",
      objects: [
        {
          id: 1,
          name: "도구10",
          number: 5,
        },
        {
          id: 2,
          name: "도구11",
          number: 1,
        },
        {
          id: 3,
          name: "도구12",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Approved,
      desiredStart: "2024-05-01",
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 3,
      studentName: "채채",
      objects: [
        {
          id: 1,
          name: "도구20",
          number: 5,
        },
        {
          id: 2,
          name: "도구21",
          number: 1,
        },
        {
          id: 3,
          name: "도구22",
          number: 1,
        },
        {
          id: 4,
          name: "도구23",
          number: 5,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Returned,
      desiredStart: "2024-05-01",
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
  ],
  total: 3,
  offset: 1,
};

export { chachaMockUpMyRental };
