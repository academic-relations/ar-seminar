"use client";

import React from "react";

import TextInput from "@sparcs-clubs/web/common/components/chacha/TextInput";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

const Chacha = () => (
  <FlexWrapper>
    <TextInput disabled />
    <TextInput disabled={false} placeholder="내용" />
    <TextInput disabled={false} placeholder="내용" errorMessage="에러 메세지" />
  </FlexWrapper>
);

export default Chacha;
