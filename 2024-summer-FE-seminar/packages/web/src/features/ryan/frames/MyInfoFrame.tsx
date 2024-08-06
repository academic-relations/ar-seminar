import { useEffect, useState } from "react";


import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";

import { useGetUserProfile } from "../services/userProfile";


const MyInfoFrame: React.FC = () => {
  const {
    data: userProfile,
    isLoading,
    isError,
  } = useGetUserProfile();

  const savedNumber = userProfile?.phoneNumber;

  const [phoneNumber, setPhoneNumber] = useState(savedNumber ?? "");
  const [phoneInput, setPhoneInput] = useState(phoneNumber);
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setPhoneNumber(savedNumber ?? "");
    }
  }, [userProfile, savedNumber]);


  const buttonDisabled = phoneNumber === phoneInput || phoneError;

  return <AsyncBoundary isLoading={isLoading} isError={isError}>
    <FoldableSectionTitle title="나의 정보">
      <Card outline padding="32px" gap={32}>
        <PhoneInput
          label="전화번호"
          value={phoneInput}
          onChange={setPhoneInput}
          placeholder="전화번호를 입력하세요"
          setErrorStatus={setPhoneError}
        />
        <Button
          type={buttonDisabled ? "disabled" : "default"}
          style={{ width: "fit-content", alignSelf: "flex-end" }}
          onClick={() => setPhoneNumber(phoneInput)}
        >저장
        </Button>
      </Card>
    </FoldableSectionTitle>
  </AsyncBoundary>
}

export default MyInfoFrame;