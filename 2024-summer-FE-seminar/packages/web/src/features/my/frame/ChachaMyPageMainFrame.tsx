"use client";

import React from "react";

import styled from "styled-components";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ChachaMyInfoFrame from "@sparcs-clubs/web/features/my/frame/_atomic/ChachaMyInfoFrame";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

const ChachaMyPageMainFrame = () => (
  <FlexWrapper direction="column">
    <PageHead
      items={[{ name: "마이페이지", path: "/my" }]}
      title="마이페이지"
    />
    <ChachaMyInfoFrame />
  </FlexWrapper>
);

export default ChachaMyPageMainFrame;
