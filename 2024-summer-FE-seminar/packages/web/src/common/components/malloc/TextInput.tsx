import React, {ChangeEvent, InputHTMLAttributes} from "react";
import styled from "styled-components";

import FormError from "@sparcs-clubs/web/common/components/FormError"
import Label from "@sparcs-clubs/web/common/components/FormLabel";

interface TextInputProps
    extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label?: string;
    placeholder: string;
    errorMessage?: string;
    area?: boolean;
    disabled?: boolean;
    value?: string;
    handleChange?: (value: string) => void;
    setErrorStatus?: (hasError: boolean) => void;
}

const Input = styled.input<TextInputProps & {hasError: boolean}>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 8px 12px;
    gap: 8px;
    border-radius: 4px;
    border: 1px solid ${({theme}) => theme.colors.GRAY[200]};
    background: ${({theme}) => theme.colors.WHITE};
    font-family: ${({theme}) => theme.fonts.FAMILY.PRETENDARD};
    font-size: 16px;
    font-style: normal;
    font-weight: ${({theme}) => theme.fonts.WEIGHT.REGULAR};
    line-height: 20px;

    &:hover:not(:focus) {
        border: 1px solid ${({theme, disabled, hasError}) =>
                disabled
                        ? !hasError && theme.colors.GRAY[200]
                        : (!hasError && theme.colors.GRAY[300]) ||
                        (hasError && theme.colors.RED[600])};
    }

    &::placeholder {
        color: ${({theme}) => theme.colors.GRAY[200]};
    }

    &:focus {
        outline: none;
        border: 1px solid ${({theme, hasError, disabled}) =>
                (!hasError && !disabled && theme.colors.PRIMARY) ||
                (hasError && !disabled && theme.colors.RED[600])};
    }

    ${({disabled, theme}) =>
            `background-color: ${disabled ? theme.colors.GRAY[100] : theme.colors.WHITE};
    color: ${disabled ? theme.colors.GRAY[300] : theme.colors.BLACK};`}
    ${({hasError, theme}) =>
            hasError ? `border: 1px solid ${theme.colors.RED[600]};` : ``}
`;

const InputWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 4px;
`;

const TextInput : React.FC<TextInputProps> =({
    label = "",
    placeholder,
    errorMessage = "",
    area = false,
    disabled = false,
    value = "",
    handleChange = () => {},
    setErrorStatus = () => {},
    ...props

}) => {
    const handleInputChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const input=e.target.value;
        handleChange(input)
    }

    return (
        <InputWrapper>
            {label && <Label>{label}</Label>}
            <InputWrapper>
                <Input
                    placeholder={placeholder}
                    hasError={!!errorMessage}
                    area={area}
                    disabled={disabled}
                    value={value}
                    onChange={handleInputChange}
                    {...props}
                />
                {errorMessage && <FormError>{errorMessage}</FormError>}
            </InputWrapper>
        </InputWrapper>
    );

}

export default TextInput;