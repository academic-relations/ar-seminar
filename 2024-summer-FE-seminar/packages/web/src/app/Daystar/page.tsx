"use client";

import React, { useState } from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import DaystarTextInput from "@sparcs-clubs/web/common/components/Daystar/DaystarTextInput";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";

const Daystar = () => {
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");

  const [secondHasError, setSecondHasError] = useState(true);

  const handleSecondTextChange = (value: string) => {
    setSecondText(value);
    setSecondHasError(value.length < 5); // 5글자보다 짧으면 에러 뜨는 것으로 테스트
  };

  return (
    <div>
      <TextInput placeholder="" />
      <ItemNumberInput placeholder="" />
      <Select items={[]} />
      <Card outline gap={16}>
        <Typography type="h3">안내사항</Typography>
        <Typography>
          입력 값들
          <br />
          {firstText}
          <br />
          {secondText}
        </Typography>
      </Card>
      <DaystarTextInput placeholder="Placeholder" handleChange={setFirstText} />
      <DaystarTextInput
        placeholder="Error"
        errorMessage={secondHasError ? "5글자 이상 입력해주세요" : ""}
        handleChange={handleSecondTextChange}
      />
      <DaystarTextInput placeholder="Disabled" disabled />
    </div>
  );
};

export default Daystar;
