/* eslint-disable react/prop-types */

import { ChangeEvent, InputHTMLAttributes, useState } from "react";

import styled, { css } from "styled-components";

import FormError from "../FormError";
import Typography from "../Typography";

interface TextInputProps 
    extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string
    maxValue: number
    unitString: string
    handleChange: (value: number) => void
}


const errorBorderStyle = css`
  border-color: ${({ theme }) => theme.colors.RED[600]};
`;

const StyledNumberInput = styled.div<TextInputProps & { hasError: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 8px 12px 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  border-radius: 4px;
  gap: 8px;
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: ${({ theme }) => theme.colors.WHITE};
  &:focus {
    border-color: ${({ theme, hasError, disabled }) =>
      !hasError && !disabled && theme.colors.PRIMARY};
  }
  &:hover:not(:focus) {
    border-color: ${({ theme, hasError, disabled }) =>
      !hasError && !disabled && theme.colors.GRAY[300]};
  }
  ${({ hasError }) => hasError && errorBorderStyle}
`;

const StyledInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[200]};
  }
`

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ItemNumberInput: React.FC<TextInputProps> = ({
    placeholder = "",
    maxValue = 0,
    unitString = "개",
    handleChange = () => {},
    ...props
}) => {
    const [ value, setValue ] = useState(0);
    const [ errorMessage, setErrorMessage ] = useState("");

    function validate(inputValue: number): string {
      if (inputValue > maxValue)
        return "신청 가능 개수를 초과했습니다"
      return ""
    }

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputString = e.target.value;
      const inputStringWithoutUnit =
        inputString.endsWith(unitString)
        ? inputString.slice(0, -unitString.length)
        : inputString;
      const inputValue = Number(inputStringWithoutUnit);

      if(Number.isNaN(inputValue)) {
        setValue(value);
        setErrorMessage("숫자만 입력 가능합니다");
      } else {
        setValue(inputValue);
        setErrorMessage(validate(inputValue));
      }

      handleChange(inputValue);
    }

    function valueString(): string {
      if (value === 0) return "";
      return `${value}${unitString}`;
    }

    return (
      <StyledInputWrapper>
        <StyledNumberInput
          placeholder={placeholder}
          hasError={!!errorMessage}
          maxValue={maxValue}
          handleChange={handleChange}
          unitString={unitString}
          {...props}
        >
          <StyledInput 
            placeholder={placeholder}
            onChange={onValueChange}
            value={valueString()}
          />
          <Typography>{`/ ${maxValue}${unitString}`}</Typography>
        </StyledNumberInput>
        {errorMessage && <FormError>{errorMessage}</FormError>}
      </StyledInputWrapper>
    );    
};

export default ItemNumberInput;

