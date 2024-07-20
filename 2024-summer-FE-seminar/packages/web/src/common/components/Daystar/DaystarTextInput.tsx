import React, { ChangeEvent, useEffect, InputHTMLAttributes } from "react";

import styled from "styled-components";

import FormError from "../FormError";
import Typography from "../Typography";

export interface DaystarTextInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  placeholder?: string;
  errorMessage?: string;
  area?: boolean;
  disabled?: boolean;
}

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

const Input = styled.input.attrs<DaystarTextInputProps>(({ area }) => ({
  as: area ? "textarea" : "input",
}))<DaystarTextInputProps>`
  display: flex;
  width: 300px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  background: var(--white, #fff);
`;
