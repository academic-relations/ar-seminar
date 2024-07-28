import { useState } from "react";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";


const MyInfoFrame: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("01075524944");
  const [phoneInput, setPhoneInput] = useState(phoneNumber);
  const [phoneError, setPhoneError] = useState(false);

  const buttonDisabled = phoneNumber === phoneInput || phoneError;

  return <FoldableSectionTitle title="나의 정보">
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
}

export default MyInfoFrame;