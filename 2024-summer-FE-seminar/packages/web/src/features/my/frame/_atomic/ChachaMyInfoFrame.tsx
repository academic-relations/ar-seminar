"use client";

import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Button from "@sparcs-clubs/web/common/components/Button";
// TODO: 토글 핸들러

const ButtonWrapper = styled.div`
  display: flex;
  margin: 0 0 0 auto;
`;

const ChachaMyInfoFrame = () => (
  <FlexWrapper direction="column" gap={40}>
    <FoldableSectionTitle title="나의 정보" toggle={true} />
    <Card padding="32px" gap={32}>
      <TextInput label="전화번호" />
      <ButtonWrapper>
        <Button>저장</Button>
      </ButtonWrapper>
    </Card>
  </FlexWrapper>
);

export default ChachaMyInfoFrame;
