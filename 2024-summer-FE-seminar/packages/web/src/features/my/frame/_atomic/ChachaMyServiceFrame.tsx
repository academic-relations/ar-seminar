"use client";

import React, { useEffect, useState } from "react";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import MyActivityCertificateTable from "@sparcs-clubs/web/features/my/component/MyActivityCertificateTable";
import MyCommonSpaceTable from "@sparcs-clubs/web/features/my/component/MyCommonSpaceTable";
import MyRentalTable from "@sparcs-clubs/web/features/my/component/MyRentalTable";
import MyPrintingTable from "@sparcs-clubs/web/features/my/component/MyPrintingTable";
import {
  chachaMockUpMyRental,
  chachaMockUpMyAcf,
  chachaMockUpMyCms,
  chachaMockUpMyPrint,
} from "@sparcs-clubs/web/features/my/service/_mock/chachaMockMyClub";
import useGetMyRental from "@sparcs-clubs/web/features/my/service/useGetMyRental";
import useGetMyAcf from "@sparcs-clubs/web/features/my/service/useGetMyAcf";
import useGetMyPrt from "@sparcs-clubs/web/features/my/service/useGetMyPrt";
import useGetMyCms from "@sparcs-clubs/web/features/my/service/useGetMyCms";

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

  const startDate = new Date("2024-01-01");
  const endDate = new Date("2025-01-01");
  const pageOffset = 1;
  const itemCount = 10;
  const clubId = 1;

  const {
    data: rentalData,
    isLoading: rentalIsLoading,
    isError: rentalIsError, // 받을 때 이름은 useQuery 반환 이름으로 맞춰 주어야 한다
  } = useGetMyRental({
    startDate: startDate,
    endDate: endDate,
    pageOffset: pageOffset,
    itemCount: itemCount,
  });

  const {
    data: acfData,
    isLoading: acfIsLoading,
    isError: acfIsError,
  } = useGetMyAcf({
    startDate: startDate,
    endDate: endDate,
    pageOffset: pageOffset,
    itemCount: itemCount,
  });

  const {
    data: prtData,
    isLoading: prtIsLoading,
    isError: prtIsError,
  } = useGetMyPrt({
    startDate: startDate,
    endDate: endDate,
    pageOffset: pageOffset,
    itemCount: itemCount,
  });

  const {
    data: cmsData,
    isLoading: cmsIsLoading,
    isError: cmsIsError,
  } = useGetMyCms({
    startDate: startDate,
    endDate: endDate,
    pageOffset: pageOffset,
    itemCount: itemCount,
  });

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
              <AsyncBoundary
                isLoading={rentalIsLoading}
                isError={rentalIsError}
              >
                <MyRentalTable rentalList={rentalData ? rentalData : []} />
              </AsyncBoundary>
            </FlexWrapper>
            <FlexWrapper direction="column" gap={20} style={{ width: "100%" }}>
              <MoreDetailTitle
                title="홍보물 인쇄"
                moreDetail="내역 더보기"
                moreDetailPath="/my/printing-business"
              />
              <AsyncBoundary isError={prtIsError} isLoading={prtIsLoading}>
                <MyPrintingTable printingList={prtData ? prtData : []} />
              </AsyncBoundary>
            </FlexWrapper>
            <FlexWrapper direction="column" gap={20} style={{ width: "100%" }}>
              <MoreDetailTitle
                title="활동확인서 발급"
                moreDetail="내역 더보기"
                moreDetailPath="/my/activity-certificate"
              />
              <AsyncBoundary isLoading={acfIsLoading} isError={acfIsError}>
                <MyActivityCertificateTable
                  certificateList={acfData ? acfData : []}
                />
              </AsyncBoundary>
            </FlexWrapper>
            <FlexWrapper direction="column" gap={20} style={{ width: "100%" }}>
              <MoreDetailTitle
                title="공용공간 비정기사용"
                moreDetail="내역 더보기"
                moreDetailPath="/my/common-space"
              />
              <AsyncBoundary isError={cmsIsError} isLoading={cmsIsLoading}>
                <MyCommonSpaceTable spaceList={cmsData ? cmsData : []} />
              </AsyncBoundary>
            </FlexWrapper>
          </ServiceTableWrapper>
        )}
      </FlexWrapper>
    )
  );
};

export default ChachaMyServiceFrame;
