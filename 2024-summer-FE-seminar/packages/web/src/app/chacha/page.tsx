"use client";

import React from "react";

import TextInput from "@sparcs-clubs/web/common/components/chacha/TextInput";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

const Chacha = () => (
  <FlexWrapper>
    <TextInput disabled />
    <TextInput disabled={false} />
  </FlexWrapper>
);

export default Chacha;
