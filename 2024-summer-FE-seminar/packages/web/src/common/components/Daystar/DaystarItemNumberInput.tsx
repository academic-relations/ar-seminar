import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

import isPropValid from "@emotion/is-prop-valid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import styled, { css } from "styled-components";

import FormError from "@sparcs-clubs/web/common/components/FormError";

import Label from "../FormLabel";

// import FormError from "../FormError";
// import Typography from "../Typography";

export interface DaystarItemNumberInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
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
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.RED[600]};
  }
`;

const disabledStyle = css`
  background: ${({ theme }) => theme.colors.GRAY[100]};
  color: ${({ theme }) => theme.colors.GRAY[300]};
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
  color: ${({ theme }) => theme.colors.BLACK};
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
  ${({ disabled }) => disabled && disabledStyle};
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

const LabelHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 4px;
`;

// 이것은 styled에 정의된 아이콘을
const StyledInfoIcon = styled(InfoOutlinedIcon)`
  color: ${({ theme }) => theme.colors.GRAY[300]};
  cursor: pointer;
  font-size: 16px;
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
  label = "",
  handleChange = () => {},
  setErrorStatus = () => {},
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState(""); // 에러 여부를 내부에서 체크

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자 형식만 떼어냅니다.

    if (
      inputValue.length <= itemLimit.toString().length &&
      inputValue !== "0"
    ) {
      // 이 if문 구조는 너무 비용이 크지만 않다면 기존 컴포넌트에도 제안 드리고 싶습니다
      // (itemLimit이 2자리보다 길어도 작동)
      handleChange(inputValue); // 이 컴포넌트를 호출한 외부에서 처리하여 적절한 value 값으로
      // 이 컴포넌트를 리렌더링해 줄 것입니다. => 아래의 useEffect가 작동하여 새로운 value에 대응합니다.
    }
  };

  useEffect(() => {
    const isValidFormat = /^\d+$/g.test(value); // 숫자만 입력되었는지 확인합니다.
    const amount = parseInt(value); // 입력을 숫자로 변환
    // 기존 코드를 가져왔습니다.
    if (value === "") {
      //
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

  const mainInputRef = useRef<HTMLInputElement>(null);
  const displayValue = value ? `${value}${unit}` : "";

  const handleCursor = () => {
    // 매 입력 또는 선택마다 커서를 적절한 위치로 옮기는 함수입니다. 그대로 가져왔습니다.
    // 이를 Input의 onSelect로 하여 키보드 입력 또는 커서 선택 시 숫자 범위를 벗어나지 않게 합니다.
    mainInputRef.current?.setSelectionRange(
      mainInputRef.current.selectionStart! >= displayValue.length
        ? displayValue.length - 1
        : mainInputRef.current.selectionStart,
      mainInputRef.current.selectionEnd! >= displayValue.length
        ? displayValue.length - 1
        : mainInputRef.current.selectionEnd,
    );
  };

  return (
    <DaystarItemNumberInputWrapper>
      <LabelHeader>
        {label && <Label>{label}</Label>}
        <StyledInfoIcon
          style={{ fontSize: "16px", width: "16px", height: "16px" }}
        />
      </LabelHeader>
      <InputWrapper>
        <Input
          ref={mainInputRef}
          hasError={!!errorMessage}
          onChange={handleValueChange}
          value={displayValue}
          onSelect={handleCursor}
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
