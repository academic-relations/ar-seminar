"use client"

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import TextInput from "@sparcs-clubs/web/common/components/ryan/TextInput";
import ItemNumberInput from "@sparcs-clubs/web/common/components/ryan/ItemNumberInput";
import { useState } from "react";
import styled from "styled-components";

const MailInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px
`

const RyanAssignmentPage: React.FC = () => {
  const [ mailId, setMailId ] = useState("");
  const [ mailDomain, setMailDomain ] = useState("");
  const [ idErrorMessage, setIdErrorMessage ] = useState("");
  const [ domainErrorMessage, setDomainErrorMessage ] = useState("");
  const [ fixDomain, setFixDomain ] = useState(false);

  const validateEmailId = (id: string) => {
    const idRegex = /^[a-zA-Z0-9._%+-]+$/;
    if (!idRegex.test(id)) {
      return '유효한 메일 ID를 입력하세요.';
    }
    return '';
  };

  const validateEmailDomain = (domain: string) => {
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domain)) {
      return '유효한 메일 도메인을 입력하세요.';
    }
    return '';
  };

  return (
    <FlexWrapper direction="column" gap={20}>
      <PageHead 
        items={[{ name: "ryan 과제", path: "/ryan" }]}
        title="ryan의 FE 세미나 #1 과제"
      />
      <Card outline>
        <Typography>메일 주소를 입력하세요.</Typography>
        <MailInput>
          <TextInput
            placeholder={"메일 ID"}
            disabled={false}
            value={mailId}
            errorMessage={idErrorMessage}
            handleChange={(value: string) => {
              setMailId(value);
              setIdErrorMessage(validateEmailId(value));
            }
          }/>
          <div style={{ position: 'relative', top: '8px' }}>@</div>
          <TextInput
            placeholder={"메일 도메인 (ex. kaist.ac.kr)"}
            disabled={fixDomain}
            value={mailDomain}
            errorMessage={domainErrorMessage}
            handleChange={(value: string) => {
              setMailDomain(value);
              setDomainErrorMessage(validateEmailDomain(value))
            }
          }/>
          <Button
            style={{height: '36px'}}
            children={fixDomain ? "직접 입력" : "kaist.ac.kr"}
            onClick={(_) => {
              if (!fixDomain) setDomainErrorMessage("");
              setMailDomain(fixDomain ? "" : "kaist.ac.kr");
              setFixDomain(!fixDomain);
            }}
          />
        </MailInput>
      </Card>
      <Card outline>
        <Typography>구매 수량을 입력하세요</Typography>
        <ItemNumberInput
          placeholder="숫자만 입력하세요"
          maxValue={50}
          unitString="개"
          handleChange={(_) => {}}
        />
      </Card>
    </FlexWrapper>
  );
}

export default RyanAssignmentPage;