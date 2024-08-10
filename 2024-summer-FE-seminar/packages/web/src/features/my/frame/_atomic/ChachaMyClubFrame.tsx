"use client";

import React, { useState } from "react";
import styled from "styled-components";

import ClubListGrid from "@sparcs-clubs/web/features/clubs/components/ClubListGrid";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import TextButton from "@sparcs-clubs/web/common/components/TextButton";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import mockMyClubList from "@sparcs-clubs/web/features/my/clubs/service/_mock/mockMyClubList";
// TODO: 토글 핸들러

const ButtonWrapper = styled.div`
  display: flex;
  margin: 0 0 0 auto;
`;

const MyClubInner = styled.div`
  display: flex;
  padding-left: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

// TODO: gap 처리
const MyClubTitleWrapper = styled.div`
  padding-left: 24px;
`;

const TextButtonWrapper = styled.div`
  display: flex;
  margin: 0 0 0 auto;
`;

const ChachaMyClubFrame = () => {
  const [toggle, setToggle] = useState<boolean>(true);

  return (
    <FlexWrapper direction="column" gap={40}>
      <FoldableSectionTitle
        title="나의 동아리"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <FlexWrapper direction="column" gap={20}>
          <MyClubTitleWrapper>
            <MoreDetailTitle
              title="2024년 봄학기"
              moreDetail="전체 보기"
              moreDetailPath="/chacha/my/clubs"
            />
          </MyClubTitleWrapper>
          <ClubListGrid clubList={mockMyClubList.semesters[0].clubs} />
        </FlexWrapper>
      )}
    </FlexWrapper>
  );
};

export default ChachaMyClubFrame;
