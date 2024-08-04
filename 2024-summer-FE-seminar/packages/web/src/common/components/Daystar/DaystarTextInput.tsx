import React, { ChangeEvent, InputHTMLAttributes, useEffect } from "react";

import isPropValid from "@emotion/is-prop-valid";

import styled, { css } from "styled-components";

import FormError from "../FormError";
// import Typography from "../Typography";

export interface DaystarTextInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  placeholder?: string;
  // hasError?: boolean; <- 이건 errorMessage의 존재 여부로 판단합니다
  errorMessage?: string;
  area?: boolean;
  disabled?: boolean;
  handleChange?: (value: string) => void; // 값이 변할 때 상위 컴포넌트의 함수를 호출할 수 있도록
  setErrorStatus?: (hasError: boolean) => void; // 에러 상태를 상위 컴포넌트에 전달
}

/*
상황에 따라 사용할 css입니다.
styled-components는 css를 정의하고 변수에 할당할 수 있도록 해 줍니다.
여기서도 안에 함수 형식의 표기를 사용할 수 있습니다.
스타일 정의의 가장 아랫 부분에, disabled 같은 props를 받아 그 props (boolean)
값에 따라서 아래 스타일을 덮어쓸 것입니다. 
*/

const disabledStyle = css`
  background: ${({ theme }) => theme.colors.GRAY[100]};
  color: ${({ theme }) => theme.colors.GRAY[300]};
`;

const hasErrorStyle = css`
  border: 1px solid ${({ theme }) => theme.colors.RED[600]};
`;

/*
[styled-components로 theme 쓰기]

styled-components에서는 각각의 스타일을, props를 parameter로 받는
함수 형태로 지정할 수 있습니다.

그리고 styled-components는, 최상위 컴포넌트를 ThemeProvider로 감싸서
Provider에 theme이라는 이름의 props 형태로 객체를 넘겨주는 방식의 theming을 지원합니다.

그러면 하위 컴포넌트는 이 theme을 사용하여 theme에 정의된 스타일을 가져올 수 있습니다.
*/

/* 
1. 입력을 받을 칸을 우선 만들고, Wrapper를 씌웁니다.
clubs에서는 styled-component라는 라이브러리를 사용하여 컴포넌트를 만듭니다.
1) styled.input : styled로 스타일링 되는 input 컴포넌트 만들기
2) .attrs() : arrtibutes를 삽입합니다. 1개의 객체 type의 argument를 받습니다.
우리는 props 중 area의 값에 따라, 만약 참이면 textarea로 바꿔주는 as라는
attribute를 사용할 것입니다. 따라서 attrs()의 입력은 위에서 정의한 props의 타입입니다.
3) area 값에 따라 as를 설정해 주도록 합니다.
4) 만들어진 component가 받을 props의 타입도 generic으로 명시해 주어야 합니다.
attrs() 함수 결과 뒤에 generic으로 달아 줍니다.
5) 그 뒤에 ` `으로 감싼 style 정보를 명시합니다.
*/

const Input = styled.input
  .attrs<DaystarTextInputProps>(({ area }) => ({
    as: area ? "textarea" : "input",
  }))
  .withConfig({
    shouldForwardProp: prop => isPropValid(prop),
  })<DaystarTextInputProps & { hasError: boolean }>`
  display: flex;
  width: 300px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  color: ${({ theme }) => theme.colors.BLACK};
  font-size: 16px;
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
  ${({ disabled }) => disabled && disabledStyle}
  ${({ hasError }) => hasError && hasErrorStyle}
`;
// 알고 보니 FormError라는 컴포넌트가 있었지만 연습의 흔적으로..
// const ErrorMessage = styled.div<DaystarTextInputProps & { hasError: boolean }>`
//   display: ${hasError => (hasError ? `block` : `none`)};
//   color: ${({ theme }) => theme.colors.RED[600]};
//   font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
//   font-size: 12px;
// `;

const DaystarTextInputWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const DaystarTextInput: React.FC<DaystarTextInputProps> = ({
  placeholder = "",
  errorMessage = "",
  handleChange = () => {},
  setErrorStatus = () => {},
  ...props
}) => {
  // 에러 상태가 변하는 경우 전달 (이해가 부족하여 우선은 거의 그대로 코드를 가져왔습니다)
  useEffect(() => {
    const hasError = !!errorMessage; // 에러 존재 여부
    if (errorMessage) {
      setErrorStatus(hasError);
    }
  }, [errorMessage, setErrorStatus]);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    // input의 onChange 시에, 상위 컴포넌트에서 전달 받은
    // 함수를 실행하도록 합니다.
    const inputValue = e.target.value;
    handleChange(inputValue);
  };
  return (
    <DaystarTextInputWrapper>
      <Input
        placeholder={placeholder}
        hasError={!!errorMessage}
        {...props}
        onChange={handleValueChange}
      />
      {!!errorMessage && <FormError>{errorMessage}</FormError>}
    </DaystarTextInputWrapper>
  );
};

export default DaystarTextInput;
