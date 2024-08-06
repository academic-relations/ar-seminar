import React, { useEffect } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";

import { useGetMyInfo } from "../services/useGetMyInfos";

const DaystarMyInfoFrame: React.FC = () => {
  const [mockPhone, setMockPhone] = React.useState<string>("01000000000");

  const [toggle, setToggle] = React.useState<boolean>(true);

  const [phone, setPhone] = React.useState<string>(mockPhone);
  const [currentPhone, setCurrentPhone] = React.useState<string>(mockPhone); // DB에서 마지막으로 가져온 전화번호
  const [errorPhone, setErrorPhone] = React.useState<boolean>(false);

  const [buttonType, setButtonType] = React.useState<
    "default" | "outlined" | "disabled"
  >(phone === currentPhone || errorPhone ? "disabled" : "default");

  const { data, isLoading, isError } = useGetMyInfo();

  useEffect(() => {
    // DB에서 전화번호를 가져올 때마다 실행
    if (data) {
      setPhone(data.phoneNumber ? data.phoneNumber : "010-0000-0000");
      setCurrentPhone(data.phoneNumber ? data.phoneNumber : "010-0000-0000");
    }
  }, [data]);

  useEffect(() => {
    // 저장 버튼의 비활성화 여부를, DB에서 마지막으로 가져온 전화번호와 입력된 번호가 같은지를 비교하여 결정
    setButtonType(
      phone === currentPhone || errorPhone ? "disabled" : "default",
    );
  }, [phone]);
  // TODO: 실제 전화번호 수정 기능 연결 (현재 API가 없어 보여서 가져오는 부분만 구현했습니다)

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FlexWrapper direction="column" gap={40}>
        <FoldableSectionTitle
          title="나의 정보"
          toggle={toggle}
          toggleHandler={() => setToggle(!toggle)}
        />
        {toggle && (
          <Card outline gap={32} style={{ flex: 1 }}>
            <PhoneInput
              label="전화번호"
              placeholder="전화번호를 입력하세요"
              value={phone}
              onChange={setPhone}
              setErrorStatus={setErrorPhone}
            />
            <Button
              type={buttonType}
              style={{ width: "max-content", alignSelf: "flex-end" }}
              onClick={() => setMockPhone(phone)} // TODO: 실제 전화번호 수정 기능 연결
            >
              저장
            </Button>
          </Card>
        )}
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default DaystarMyInfoFrame;
