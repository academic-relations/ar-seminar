"use client";

import React from "react";

import styled from "styled-components";

import ClubCard from "@sparcs-clubs/web/features/clubs/components/ClubCard";
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
  width: 1096px;
  height: 24px;
  align-items: flex-start;
`;

const MyClubCardWrapper = styled.div``;

const TextButtonWrapper = styled.div`
  display: flex;
  margin: 0 0 0 auto;
`;

const ChachaMyClubFrame = () => (
  <FlexWrapper direction="column" gap={40}>
    <FoldableSectionTitle title="나의 동아리" toggle={true} />
    <MyClubInner>
      <MyClubTitleWrapper>
        <Typography ff="PRETENDARD" fs={20} lh={24} color="BLACK" fw="MEDIUM">
          2024년 봄학기
        </Typography>
        <TextButtonWrapper>
          <TextButton text="전체보기" disabled={false} onClick={() => {}} />
        </TextButtonWrapper>
      </MyClubTitleWrapper>
      <ClubCard club="예쁜 영화" />
      <ClubCard />
    </MyClubInner>
  </FlexWrapper>
);

export default ChachaMyClubFrame;