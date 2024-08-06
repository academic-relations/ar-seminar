"use client"

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import MyClubFrame from "@sparcs-clubs/web/features/ryan/frames/MyClubFrame";
import MyInfoFrame from "@sparcs-clubs/web/features/ryan/frames/MyInfoFrame";
import MyServiceFrame from "@sparcs-clubs/web/features/ryan/frames/MyServiceFrame";

const MyRyan: React.FC = () => (
  <FlexWrapper direction="column" gap={60}>
    <PageHead
      items={[
        { name: "ryan 과제", path: "/ryan "},
        { name: "마이페이지", path: "/ryan/my" }]}
      title="마이페이지"
    />
    <MyInfoFrame/>
    <MyClubFrame/>
    <MyServiceFrame/>
  </FlexWrapper>
);

export default MyRyan;