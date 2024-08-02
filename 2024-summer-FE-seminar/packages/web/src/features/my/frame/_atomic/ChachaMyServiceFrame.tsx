"use client";

import React, { useEffect, useState } from "react";

import styled from "styled-components";

import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import MyActivityCertificateTable from "@sparcs-clubs/web/features/my/component/MyActivityCertificateTable";
import MyCommonSpaceTable from "@sparcs-clubs/web/features/my/component/MyCommonSpaceTable";
import MyRentalTable from "@sparcs-clubs/web/features/my/component/MyRentalTable";
import MyPrintingTable from "@sparcs-clubs/web/features/my/component/MyPrintingTable";
import { mockupMyPrint } from "@sparcs-clubs/web/features/my/service/_mock/mockMyClub";
import {
  chachaMockUpMyRental,
  chachaMockUpMyAcf,
  chachaMockUpMyCms,
} from "@sparcs-clubs/web/features/my/service/_mock/chachaMockMyClub";

const ButtonWrapper = styled.div`
  display: flex;
  margin: 0 0 0 auto;
`;

const ServiceTableWrapper = styled.div`
  display: flex;
  padding-left: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  align-self: stretch;
`;

const ChachaMyServiceFrame = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [toggle, setToggle] = React.useState<boolean>(true);

  return (
    mounted && (
      <FlexWrapper direction="column" gap={40}>
        <FoldableSectionTitle
          title="서비스 신청 내역"
          toggle={toggle}
          toggleHandler={() => setToggle(!toggle)}
        />
        {toggle && (
          <ServiceTableWrapper>
            <FlexWrapper direction="column" gap={20} style={{ width: "100%" }}>
              <MoreDetailTitle
                title="대여 사업"
                moreDetail="내역 더보기"
                moreDetailPath="/my/rental-business"
              />
              <MyRentalTable rentalList={chachaMockUpMyRental} />
            </FlexWrapper>
            <FlexWrapper direction="column" gap={20} style={{ width: "100%" }}>
              <MoreDetailTitle
                title="홍보물 인쇄"
                moreDetail="내역 더보기"
                moreDetailPath="/my/printing-business"
              />
              <MyPrintingTable printingList={mockupMyPrint} />
            </FlexWrapper>
            <FlexWrapper direction="column" gap={20} style={{ width: "100%" }}>
              <MoreDetailTitle
                title="활동확인서 발급"
                moreDetail="내역 더보기"
                moreDetailPath="/my/activity-certificate"
              />
              <MyActivityCertificateTable certificateList={chachaMockUpMyAcf} />
            </FlexWrapper>
            <FlexWrapper direction="column" gap={20} style={{ width: "100%" }}>
              <MoreDetailTitle
                title="공용공간 비정기사용"
                moreDetail="내역 더보기"
                moreDetailPath="/my/common-space"
              />
              <MyCommonSpaceTable spaceList={chachaMockUpMyCms} />
            </FlexWrapper>
          </ServiceTableWrapper>
        )}
      </FlexWrapper>
    )
  );
};

export default ChachaMyServiceFrame;
