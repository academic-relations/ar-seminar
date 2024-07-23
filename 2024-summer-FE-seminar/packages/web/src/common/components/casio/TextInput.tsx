import React, { ChangeEvent, InputHTMLAttributes, useEffect } from "react";
import styled, { css } from "styled-components";
import FormError from "../FormError";
import Label from "../FormLabel";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  errorMessage?: string;
  handleChange?: (value: string) => void;
  setErrorStatus?: (hasError: boolean) => void;
}

const errorBorderStyle = css`
  border-color: ${({ theme }) => theme.colors.RED[600]};
`;

const disabledStyle = css`
  background-color: ${({ theme }) => theme.colors.GRAY[100]};
  border-color: ${({ theme }) => theme.colors.GRAY[200]};
`;

interface StyledInputProps {
  hasError: boolean;
}

const Input = styled.input<StyledInputProps>`
  display: block;
  width: 100%;
  padding: 8px 12px;
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

const InputWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 4px;
`;

const TextInput: React.FC<TextInputProps> = ({
  label = "",
  placeholder,
  errorMessage = "",
  disabled = false,
  value = "",
  handleChange = () => {},
  setErrorStatus = () => {},
  ...props
}) => {
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    handleChange(inputValue);
  };

  useEffect(() => {
    const hasError = !!errorMessage;
    setErrorStatus(hasError);
  }, [errorMessage, setErrorStatus]);

  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <Input
          placeholder={placeholder}
          hasError={!!errorMessage}
          disabled={disabled}
          value={value}
          onChange={handleValueChange}
          {...(props as InputHTMLAttributes<HTMLInputElement>)} // Ensure props are of type InputHTMLAttributes<HTMLInputElement>
        />
        {errorMessage && <FormError>{errorMessage}</FormError>}
      </InputWrapper>
    </InputWrapper>
  );
};

export default TextInput;
