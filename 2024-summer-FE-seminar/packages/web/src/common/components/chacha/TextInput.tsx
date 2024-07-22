"use client";

import React from "react";

import styled from "styled-components";

import Typography from "@sparcs-clubs/web/common/components/Typography";

interface TextInputProps {
  disabled: boolean;
  error?: boolean;
}

const TextInputWrapper = styled.div`
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
    border: 1px solid ${({ theme }) => theme.colors.PRIMARY};
  }
  &:hover:not(:focus) {
    border: 1px solid
      ${({ theme, disabled }) =>
        disabled ? theme.colors.GRAY[200] : theme.colors.GRAY[300]};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[200]};
  }
  ${({ disabled, theme }) =>
    `background-color: ${disabled ? theme.colors.GRAY[100] : theme.colors.WHITE};
    color: ${disabled ? theme.colors.GRAY[300] : theme.colors.BLACK};`}
`;

const TextInputInner = styled.div`
  flex: 1 0 0;
  color: inherit;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  font-style: normal;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  line-height: 20px;
`;

const TextInput: React.FC<TextInputProps> = ({ disabled, focused, error }) => (
  <TextInputWrapper disabled={disabled} focused={focused} error={error}>
    <TextInputInner>내용</TextInputInner>
  </TextInputWrapper>
);

export default TextInput;
