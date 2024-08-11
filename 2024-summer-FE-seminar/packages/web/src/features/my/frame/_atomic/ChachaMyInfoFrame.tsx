"use client";

import React, { useEffect, useState } from "react";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import Button from "@sparcs-clubs/web/common/components/Button";
import useGetMyUser from "@sparcs-clubs/web/features/my/service/useGetMyUser";
import chachaMockUpPhone from "@sparcs-clubs/web/features/my/user/_mock/chachaMockUpPhone";

const ButtonWrapper = styled.div`
  display: flex;
  margin: 0 0 0 auto;
`;

const ChachaMyInfoFrame = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const { data, isError, isLoading } = useGetMyUser({});
  // const [mockPhone, setMockPhone] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // 데이터가 로드된 후 한 번만 초기 전화번호 설정
  useEffect(() => {
    if (data?.phoneNumber && phone === "") {
      const formattedPhone =
        data.phoneNumber.slice(0, 3) +
        "-" +
        data.phoneNumber.slice(3, 7) +
        "-" +
        data.phoneNumber.slice(7, 11);
      setPhone(formattedPhone);
      // setPhone(mockPhone);
    }
  }, [data]);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Event:", event);
    console.log("Event Target:", event.target);
    console.log("Event Target Value:", event.target?.value);

    if (event.target?.value !== undefined) {
      setPhone(event.target.value);
    } else {
      console.error("Event target value is undefined. Event:", event);
    }
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
          <AsyncBoundary isError={isError} isLoading={isLoading}>
            <PhoneInput
              label="전화번호"
              value={phone}
              onChange={handlePhoneChange}
            />
          </AsyncBoundary>
          <ButtonWrapper>
            <Button>저장</Button>
          </ButtonWrapper>
        </Card>
      )}
    </FlexWrapper>
  );
};

export default ChachaMyInfoFrame;
