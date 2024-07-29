import React, { useEffect, useState } from "react";

import styled from "styled-components";

import Label from "../FormLabel";

import FormError from "../FormError";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface ItemNumberInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  constraint?: number;
  disabled: boolean;
  error?: boolean;
  placeholder: string;
  label: string;
  input?: string;
  setInputValue?: (inputValue: string) => void;
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
    error
      ? `border: 1px solid ${theme.colors.RED[600]};
    color: ${theme.colors.RED[600]}`
      : ``};
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
  constraint = 99,
  disabled,
  error = false,
  placeholder,
  label,
  input = "",
  setInputValue = () => {},
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [shownValue, setShownValue] = useState("");

  useEffect(() => {
    if (input === "") return;
    setShownValue(`${input}개`);
  }, [input, shownValue]);
  // useEffect(() => {
  //   const digitTest = /^\d*$/g.test(input);
  //   console.log(input);
  //   const inputNumber = parseInt(input);

  //   if (input === "") {
  //     setErrorMessage("");
  //   } else if (!digitTest) {
  //     setErrorMessage("숫자만 입력 가능합니다");
  //     console.log(digitTest);
  //   } else if (inputNumber > constraint) {
  //     setErrorMessage("신청 가능 갯수를 초과했습니다");
  //     console.log(constraint);
  //     console.log(inputNumber);
  //   } else {
  //     setErrorMessage("");
  //   }
  //   setInputValue(input);
  // }, [input, constraint]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShownValue(input);
    const value = e.target.value.replace("개", "");
    const digitTest = /^\d*$/g.test(value);

    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    console.log(e.target.value);
    const inputNumber = parseInt(inputValue);

    if (value === "") {
      setErrorMessage("");
      setInputValue("");
    } else if (!digitTest) {
      setShownValue("");
      setInputValue("");
      setErrorMessage("숫자만 입력 가능합니다");
    } else if (inputNumber > constraint) {
      setErrorMessage("신청 가능 갯수를 초과했습니다");
      setInputValue(inputValue);
      setShownValue(`${inputValue}개`);
    } else {
      setErrorMessage("");
      setInputValue(inputValue);
      setShownValue(`${inputValue}개`);
    }
  };

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const inputValue = e.target.value.replace("개", "");
  //   console.log(input);
  //   setInputValue(inputValue);
  // };

  return (
    <ItemInputWrapper>
      <ItemLabel>
        {label && <Label>{label}</Label>}
        <Icon style={{ fontSize: "16px" }} />
      </ItemLabel>
      <ItemInputInner error={!!errorMessage}>
        <ItemInput
          placeholder={placeholder}
          disabled={disabled}
          placeholder={placeholder}
          value={shownValue}
          onChange={handleChange}
          error={!!errorMessage}
        />
        <ItemInputConstraint>/ {constraint}개</ItemInputConstraint>
      </ItemInputInner>
      {errorMessage && <FormError>{errorMessage}</FormError>}
    </ItemInputWrapper>
  );
};

export default ItemNumberInput;
