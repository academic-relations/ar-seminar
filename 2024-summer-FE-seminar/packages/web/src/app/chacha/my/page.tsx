"use client";

import React from "react";

import styled from "styled-components";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ChachaMyInfoFrame from "@sparcs-clubs/web/features/my/frame/_atomic/ChachaMyInfoFrame";
import ChachaMyClubFrame from "@sparcs-clubs/web/features/my/frame/_atomic/ChachaMyClubFrame";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

const ChachaMy = () => (
  <FlexWrapper direction="column" gap={60}>
    <PageHead
      items={[{ name: "마이페이지", path: "/my" }]}
      title="마이페이지"
    />
    <ChachaMyInfoFrame />
    <ChachaMyClubFrame />
  </FlexWrapper>
);

export default ChachaMy;
