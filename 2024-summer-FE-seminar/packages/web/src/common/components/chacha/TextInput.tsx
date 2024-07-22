"use client";

import React, { ChangeEvent, InputHTMLAttributes, useEffect } from "react";

import styled from "styled-components";

import FormError from "../FormError";

import Typography from "@sparcs-clubs/web/common/components/Typography";

interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  // 의미 : HTML 요소의 기본 속성을 쓸 수 있음.
  disabled: boolean;
  error?: boolean;
  errorMessage?: string;
  placeholder: string;
  inputValue?: string;
  onValueChange?: (inputValue: string) => void;
}

const TextInputInner = styled.input`
  display: flex;
  width: 300px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  background: ${({ theme }) => theme.colors.WHITE};
  &:focus {
    outline: none;
    border: 1px solid
      ${({ theme, error, disabled }) =>
        (!error && !disabled && theme.colors.PRIMARY) ||
        (error && !disabled && theme.colors.RED[600])};
  }
  &:hover:not(:focus) {
    border: 1px solid
      ${({ theme, disabled, error }) =>
        disabled
          ? !error && theme.colors.GRAY[200]
          : (!error && theme.colors.GRAY[300]) ||
            (error && theme.colors.RED[600])};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[200]};
  }
  ${({ disabled, theme }) =>
    `background-color: ${disabled ? theme.colors.GRAY[100] : theme.colors.WHITE};
    color: ${disabled ? theme.colors.GRAY[300] : theme.colors.BLACK};`}

  ${({ error, theme }) =>
    error ? `border: 1px solid ${theme.colors.RED[600]};` : ``}

  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  font-style: normal;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  line-height: 20px;
`;

const TextInputWrapper = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const TextInput: React.FC<TextInputProps> = ({
  disabled,
  error = false,
  errorMessage = "",
  placeholder,
  inputValue = "", // 의미: api 연결 시 필요, 모듈화 목적?
  onValueChange = () => {}, // 의미: 필요한 함수 대입 사용.
}) => {
  // 코드 참고
  // const setInputValue = (e: ChangeEvent<HTMLInputElement>) => {
  //   const input = e.target.value;
  //   onValueChange(input);
  // };

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);

  return (
    <TextInputWrapper>
      <TextInputInner
        disabled={disabled}
        error={!!errorMessage}
        placeholder={placeholder}
        value={inputValue}
      />
      {errorMessage && <FormError>{errorMessage}</FormError>}
    </TextInputWrapper>
  );
};
export default TextInput;
