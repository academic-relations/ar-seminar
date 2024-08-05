// import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import MyClubFrame from "../my/frame/_atomic/MyClubFrame";
import MyInfoFrame from "../my/frame/_atomic/MyInfoFrame";

import DaystarMyServiceFrame from "./frames/DaystarMyServiceFrame";

/*
1. 각각의 Frame은 gap=60px로 세로로 배치된다
2. 나의 정보 -> MyInfoFrame / 나의 동아리 -> MyClubFrame
/ 동아리 신청 내역 -> 구현이 완료되지 않음 / 서비스 신청 내역 -> MyServiceFrame
3. PageHead : BreadCrumb와 PageTitle로 구성
- BreadCrumb : 아래의 props 타입을 가진다

*/

const DaystarMyPageMainFrame: React.FC = () => (
  <FlexWrapper direction="column" gap={60}>
    <PageHead
      items={[
        { name: "Daystar", path: "/Daystar" },
        { name: "마이페이지", path: "/Daystar/my" },
      ]}
      title="마이페이지"
    />
    <MyInfoFrame />
    <MyClubFrame />
    <DaystarMyServiceFrame />
  </FlexWrapper>
);

export default DaystarMyPageMainFrame;
