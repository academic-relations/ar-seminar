import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled, { css } from "styled-components";

import FormError from "@sparcs-clubs/web/common/components/FormError";

// import FormError from "../FormError";
// import Typography from "../Typography";

export interface DaystarItemNumberInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  placeholder?: string;
  // hasError?: boolean; <- 이건 errorMessage의 존재 여부로 판단합니다
  disabled?: boolean;
  unit?: string; // 단위
  value?: string; // 입력 값
  itemLimit?: number; // 최대 수량
  handleChange?: (value: string) => void; // 값이 변할 때 상위 컴포넌트의 함수를 호출할 수 있도록
  setErrorStatus?: (hasError: boolean) => void; // 에러 상태를 상위 컴포넌트에 전달
}

const errorStyle = css`
  border: 1px solid ${({ theme }) => theme.colors.RED[600]};
`;

const Input = styled.input.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
  // 왜 InputText에서는 검사하지 않는지는 잘 모르겠습니다. 우선 코드를 가져왔습니다.
  // 여기서는 textarea가 될 상황이 없어서 attrs는 사용하지 않습니다.
})<DaystarItemNumberInputProps & { hasError: boolean }>`
  width: 100%;
  display: flex;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 4px;
  color: var(--black, #333);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  background: ${({ theme }) => theme.colors.WHITE};
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[200]};
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.PRIMARY};
    outline: none;
  }
  &:hover:not(:focus) {
    border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
  }

  ${({ hasError }) => hasError && errorStyle};
`;

const MaxUnit = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ hasError: boolean }>`
  position: absolute;
  right: 12px;
  left: auto;
  top: auto;
  bottom: auto;
  display: flex;
  align-items: center;
  color: ${({ theme, hasError }) =>
    hasError ? theme.colors.RED[600] : theme.colors.GRAY[300]};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 125% */
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const DaystarItemNumberInputWrapper = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const DaystarItemNumberInput: React.FC<DaystarItemNumberInputProps> = ({
  itemLimit = 0,
  unit = null,
  value = "",
  handleChange = () => {},
  setErrorStatus = () => {},
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState(""); // 에러 여부를 내부에서 체크

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자 형식만 떼어냅니다.
    handleChange(inputValue); // 이 컴포넌트를 호출한 외부에서 처리하여 적절한 value 값으로
    // 이 컴포넌트를 리렌더링해 줄 것입니다. => 아래의 useEffect가 작동하여 새로운 value에 대응합니다.
  };

  useEffect(() => {
    const isValidFormat = /^\d+$/g.test(value); // 숫자만 입력되었는지 확인합니다.
    const amount = parseInt(value); // 입력을 숫자로 변환
    // 기존 코드를 가져왔습니다.
    if (value === "") {
      // [ToDo] 빈 경우 -> 왜 이 경우에도 숫자만 입력하라 하지?
      setErrorMessage("");
      setErrorStatus(false);
    } else if (!isValidFormat) {
      // 숫자 아님
      setErrorMessage("숫자만 입력해주세요.");
      setErrorStatus(true);
    } else if (amount > itemLimit) {
      setErrorMessage("신청 가능 개수를 초과했습니다.");
      setErrorStatus(true);
    } else {
      setErrorMessage("");
      setErrorStatus(false);
    }
  }, [value, itemLimit, setErrorStatus]);

  return (
    <DaystarItemNumberInputWrapper>
      <InputWrapper>
        <Input
          hasError={!!errorMessage}
          onChange={handleValueChange}
          {...props}
        />
        {unit && itemLimit && (
          <MaxUnit hasError={!!errorMessage}>{`/ ${itemLimit}${unit}`}</MaxUnit>
        )}
      </InputWrapper>
      {errorMessage && <FormError>{errorMessage}</FormError>}
    </DaystarItemNumberInputWrapper>
  );
};
export default DaystarItemNumberInput;
