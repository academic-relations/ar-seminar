"use client";

import React from "react";

import TextInput from "@sparcs-clubs/web/common/components/chacha/TextInput";
import ItemNumberInput from "@sparcs-clubs/web/common/components/chacha/ItemNumberInput";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

const Chacha = () => (
  <FlexWrapper style={{ flexDirection: "column" }} gap={16}>
    <TextInput disabled />
    <TextInput disabled={false} placeholder="내용" />
    <TextInput disabled={false} placeholder="내용" errorMessage="에러 메세지" />
    <ItemNumberInput disabled={false} placeholder="내용" label="Label" />
  </FlexWrapper>
);

export default Chacha;
