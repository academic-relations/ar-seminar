"use client";

import React from "react";

import ClubListGrid from "@sparcs-clubs/web/features/clubs/components/ClubListGrid";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import mockMyClubList from "@sparcs-clubs/web/features/my/clubs/service/_mock/mockMyClubList";

const ChachaMyClubs = () => {
  const [toggle, setToggle] = React.useState<boolean>(true);

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "마이페이지", path: "/my" },
          { name: "나의 동아리", path: "/my/clubs" },
        ]}
        title="나의 동아리"
      />
      {mockMyClubList.semesters.map(e => (
        <React.Fragment key={e.id}>
          <FoldableSectionTitle
            title={e.name}
            toggle={toggle}
            toggleHandler={() => setToggle(!toggle)}
          />
          <ClubListGrid clubList={e.clubs} />
        </React.Fragment>
      ))}
    </FlexWrapper>
  );
};

export default ChachaMyClubs;
