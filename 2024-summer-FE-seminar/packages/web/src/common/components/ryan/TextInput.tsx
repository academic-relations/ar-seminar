/* eslint-disable react/prop-types */
import { ChangeEvent, InputHTMLAttributes } from "react"

import styled, { css } from "styled-components";

import FormError from "../FormError";

interface TextInputProps 
    extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string
    disabled: boolean
    value: string
    errorMessage: string
    handleChange: (value: string) => void
}


const errorBorderStyle = css`
  border-color: ${({ theme }) => theme.colors.RED[600]};
`;

const disabledStyle = css`
  background-color: ${({ theme }) => theme.colors.GRAY[100]};
  border-color: ${({ theme }) => theme.colors.GRAY[200]};
`;

const StyledInput = styled.input<TextInputProps & { hasError: boolean }>`
  display: block;
  width: 100%;
  padding: 8px 12px 8px 12px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  border-radius: 4px;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
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
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[200]};
  }
  ${({ disabled }) => disabled && disabledStyle}
  ${({ hasError }) => hasError && errorBorderStyle}
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const TextInput: React.FC<TextInputProps> = ({
    placeholder = "",
    value = "",
    errorMessage = "",
    disabled = false,
    handleChange = () => {},
    ...props
}) => {
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        handleChange(inputValue);
    }

    return (
      <StyledInputWrapper>
        <StyledInput
          placeholder={placeholder}
          hasError={!!errorMessage}
          disabled={disabled}
          value={value}
          errorMessage={errorMessage}
          handleChange={handleChange}
          onChange={onValueChange}
          {...props}
        />
        {errorMessage && <FormError>{errorMessage}</FormError>}
      </StyledInputWrapper>
    );    
};

export default TextInput;

