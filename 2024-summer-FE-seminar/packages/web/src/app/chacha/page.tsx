"use client";

import React, { useState, useEffect } from "react";

import TextInput from "@sparcs-clubs/web/common/components/chacha/TextInput";
import ItemNumberInput from "@sparcs-clubs/web/common/components/chacha/ItemNumberInput";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

const Chacha = () => {
  const [inputText, setInputText] = useState("");
  const [inputNumber, setInputNumber] = useState("");

  useEffect(() => {
    setInputText(inputText);
  }, [inputText]);
  return (
    <FlexWrapper style={{ flexDirection: "column" }} gap={16}>
      <TextInput disabled inputValue={inputText} setInputValue={setInputText} />
      <TextInput
        disabled={false}
        placeholder="내용"
        inputValue={inputText}
        setInputValue={setInputText}
      />
      <TextInput
        disabled={false}
        placeholder="내용"
        errorMessage="에러 메세지"
        inputValue={inputText}
        setInputValue={setInputText}
      />
      <ItemNumberInput
        disabled={false}
        placeholder="내용"
        label="Label"
        input={inputNumber}
        setInputValue={setInputNumber}
      />
    </FlexWrapper>
  );
};

export default Chacha;
