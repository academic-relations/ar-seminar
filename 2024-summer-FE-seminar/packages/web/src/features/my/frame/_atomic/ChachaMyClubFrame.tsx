"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import styled from "styled-components";

import ClubListGrid from "@sparcs-clubs/web/features/clubs/components/ClubListGrid";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
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
  display: flex;
  flex-direction: row;
  margin: auto;
  align-items: flex-start;
`;

const TextButtonWrapper = styled.div`
  display: flex;
  margin: 0 0 0 auto;
`;

const ChachaMyClubFrame = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState<boolean>(true);

  const onClick = () => router.push(`/chacha/my/clubs`);

  return (
    <FlexWrapper direction="column" gap={40}>
      <FoldableSectionTitle
        title="나의 동아리"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <MyClubInner>
          <MyClubTitleWrapper>
            <Typography
              ff="PRETENDARD"
              fs={20}
              lh={24}
              color="BLACK"
              fw="MEDIUM"
            >
              2024년 봄학기
            </Typography>
            <TextButtonWrapper>
              <TextButton
                text="전체보기"
                disabled={false}
                onClick={() => onClick()}
              />
            </TextButtonWrapper>
          </MyClubTitleWrapper>
          <ClubListGrid clubList={mockMyClubList.semesters[0].clubs} />
        </MyClubInner>
      )}
    </FlexWrapper>
  );
};

export default ChachaMyClubFrame;
