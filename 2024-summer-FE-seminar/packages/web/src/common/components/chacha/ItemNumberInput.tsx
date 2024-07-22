import React, { useEffect } from "react";

import styled from "styled-components";

import Label from "../FormLabel";

import FormError from "../FormError";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface ItemNumberInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  input?: string;
  constraint?: number;
  disabled: boolean;
  error?: boolean;
  errorMessage?: string;
  placeholder: string;
  label: string;
}

const ItemInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const ItemLabel = styled.div`
  display: flex;
  padding: 0px 2px;
  align-items: center;
  gap: 4px;
  align-self: stretch;
`;

const Icon = styled(InfoOutlinedIcon)`
  color: ${({ theme }) => theme.colors.GRAY[300]};
  cursor: pointer;
  width: 16px;
  height: 16px;
`;

const ItemInputInner = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
`;

const ItemInput = styled.input`
  width: 100%;
  border-radius: 4px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  background: ${({ theme }) => theme.colors.WHITE};
  z-index: 0;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  font-style: normal;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  line-height: 20px;
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
    error ? `border: 1px solid ${theme.colors.RED[600]};` : ``};
`;

const ItemInputConstraint = styled.div`
  display: flex;
  white-space: nowrap;
  position: relative;
  right: 60px;
  color: ${({ theme }) => theme.colors.GRAY[300]};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  font-style: normal;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  line-height: 20px;
  z-index: 1;
`;

const ItemNumberInput: React.FC<ItemNumberInputProps> = ({
  input = "",
  constraint = 99,
  disabled,
  error = false,
  errorMessage = "",
  placeholder,
  label,
}) => {
  useEffect(() => {
    const digitTest = /^\d+$/g.test(input);
    const inputNumber = parseInt(input);

    if (!digitTest) {
      errorMessage = "숫자만 입력 가능합니다";
      console.log(digitTest);
    } else if (inputNumber > constraint) {
      errorMessage = "신청 가능 갯수를 초과했습니다";
      console.log(constraint);
      console.log(inputNumber);
    } else {
      errorMessage = "";
    }
    // setInputValue(input);
  }, [input, constraint]);

  return (
    <ItemInputWrapper>
      <ItemLabel>
        {label && <Label>{label}</Label>}
        <Icon style={{ fontSize: "16px" }} />
      </ItemLabel>
      <ItemInputInner error={!!errorMessage}>
        <ItemInput placeholder={placeholder} value={input} />
        <ItemInputConstraint>/ {constraint}개</ItemInputConstraint>
      </ItemInputInner>
      {errorMessage && <FormError>{errorMessage}</FormError>}
    </ItemInputWrapper>
  );
};

export default ItemNumberInput;
