"use client";

import React, { useEffect, useState } from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Button from "@sparcs-clubs/web/common/components/Button";

import chachaMockUpPhone from "@sparcs-clubs/web/features/my/user/_mock/chachaMockUpPhone";

const ButtonWrapper = styled.div`
  display: flex;
  margin: 0 0 0 auto;
`;

const ChachaMyInfoFrame = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [mockPhone, setMockPhone] = useState<string>(
    chachaMockUpPhone.chachaMockUpMyPhone.phoneNumber,
  );
  const newMockPhone =
    mockPhone.slice(0, 3) +
    "-" +
    mockPhone.slice(3, 7) +
    "-" +
    mockPhone.slice(7, 11);
  const [phone, setPhone] = useState<string>(newMockPhone);
  // console.log(chachaMockUpPhone.chachaMockUpMyPhone.phoneNumber);

  // useEffect(() => {
  //   setMockPhone(chachaMockUpPhone.chachaMockUpMyPhone.phoneNumber);
  //   console.log(chachaMockUpPhone.chachaMockUpMyPhone.phoneNumber);
  // }, []);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  return (
    <FlexWrapper direction="column" gap={40}>
      <FoldableSectionTitle
        title="나의 정보"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <Card padding="32px" gap={32}>
          <TextInput
            label="전화번호"
            value={phone}
            onChange={handlePhoneChange}
          />
          <ButtonWrapper>
            <Button>저장</Button>
          </ButtonWrapper>
        </Card>
      )}
    </FlexWrapper>
  );
};

export default ChachaMyInfoFrame;
