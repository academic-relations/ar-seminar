import React, { useEffect, useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import {
  useGetMyAcf,
  useGetMyCms,
  useGetMyPrint,
  useGetMyRental,
} from "@sparcs-clubs/web/features/Daystar/services/useGetMyInfos";
// import {
//   mockupMyAcf,
//   mockupMyCms,
//   mockupMyPrint,
//   mockupMyRental,
// } from "@sparcs-clubs/web/features/my/service/_mock/mockMyClub";

import { ManageTablesWrapper } from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";

import DaystarMyActivityCertificateTable from "../components/DaystarMyActivityCertificateTable";
import DaystarMyCommonSpaceTable from "../components/DaystarMyCommonSpaceTable";
import DaystarMyPrintingTable from "../components/DaystarMyPrintingTable";
import DaystarMyRentalTable from "../components/DaystarMyRentalTable";

const DaystarMyServiceFrame: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(true);
  const {
    data: acfData,
    isLoading: acfIsLoading,
    isError: acfIsError,
  } = useGetMyAcf();
  const {
    data: cmsData,
    isLoading: cmsIsLoading,
    isError: cmsIsError,
  } = useGetMyCms();
  const {
    data: printData,
    isLoading: printIsLoading,
    isError: printIsError,
  } = useGetMyPrint();
  const {
    data: rentalData,
    isLoading: rentalIsLoading,
    isError: rentalIsError,
  } = useGetMyRental();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!acfIsLoading && !cmsIsLoading && !printIsLoading && !rentalIsLoading) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [acfIsLoading, cmsIsLoading, printIsLoading, rentalIsLoading]);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (acfIsError || cmsIsError || printIsError || rentalIsError) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [acfIsError, cmsIsError, printIsError, rentalIsError]);

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FlexWrapper direction="column" gap={40}>
        <FoldableSectionTitle
          title="서비스 신청 내역"
          toggle={toggle}
          toggleHandler={() => setToggle(!toggle)}
        />
        {toggle && (
          <ManageTablesWrapper>
            <FlexWrapper direction="column" gap={20}>
              <MoreDetailTitle
                title="대여 사업"
                moreDetail="내역 더보기"
                moreDetailPath="/my/rental-business"
              />
              <DaystarMyRentalTable rentalList={rentalData} />
            </FlexWrapper>
            <FlexWrapper direction="column" gap={20}>
              <MoreDetailTitle
                title="홍보물 인쇄"
                moreDetail="내역 더보기"
                moreDetailPath="/my/printing-business"
              />
              <DaystarMyPrintingTable printingList={printData} />
            </FlexWrapper>
            <FlexWrapper direction="column" gap={20}>
              <MoreDetailTitle
                title="활동확인서 발급"
                moreDetail="내역 더보기"
                moreDetailPath="/my/activity-certificate"
              />
              <DaystarMyActivityCertificateTable certificateList={acfData} />
            </FlexWrapper>
            <FlexWrapper direction="column" gap={20}>
              <MoreDetailTitle
                title="공용공간 비정기사용"
                moreDetail="내역 더보기"
                moreDetailPath="/my/common-space"
              />
              <DaystarMyCommonSpaceTable spaceList={cmsData} />
            </FlexWrapper>
          </ManageTablesWrapper>
        )}
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default DaystarMyServiceFrame;
