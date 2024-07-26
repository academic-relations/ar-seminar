import React, {ChangeEvent, InputHTMLAttributes, useEffect, useRef, useState} from "react";

import styled from "styled-components";

import FormError from "@sparcs-clubs/web/common/components/FormError"
import Label from "@sparcs-clubs/web/common/components/FormLabel";

interface ItemNumberInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label?: string;
    placeholder: string;
    errorMessage?: string;
    disabled?: boolean;
    limit?: number;
    unit?: string;
    value?: string;
    handleChange?: (value: string) => void;
    setErrorStatus?: (hasError: boolean) => void;
}

const Input = styled.input<ItemNumberInputProps & { hasError: boolean }>`
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
    padding-right: ${({limit}) => (limit ? "48px" : "12px")};

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

const InputWrapper2 = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
`;

const UnitWrapper = styled.div<{ hasError: boolean }>`
    display: flex;
    position: absolute;
    right: 10px;
    align-items: center;
    color: ${({theme}) => theme.colors.GRAY[300]};
    font-family: ${({theme}) => theme.fonts.FAMILY.PRETENDARD};
    font-size: 16px;
    font-style: normal;
    font-weight: ${({theme}) => theme.fonts.WEIGHT.REGULAR};
    line-height: 20px;
    color: ${({theme, hasError}) =>
            hasError ? theme.colors.RED[600] : theme.colors.GRAY[300]};
`;

const ItemNumberInput: React.FC<ItemNumberInputProps> = ({
    label = "",
    placeholder,
    disabled = false,
    limit = 99,
    unit = "개",
    value = "",
    handleChange = () => {
    },
    setErrorStatus = () => {
    },
    ...props
}) => {
    const [error, setError] = useState("");

    useEffect(() => {
        const isValidFormat = /^\d+$/g.test(value);
        const intValue = parseInt(value);
        if (value === "") {
            setError("");
            setErrorStatus(false);
        } else if (!isValidFormat) {
            setError("숫자만 입력 가능합니다");
            setErrorStatus(true);
        } else if (intValue > limit) {
            setError("신청 가능한 개수를 초과했습니다");
            setErrorStatus(true);
        } else {
            setError("");
            setErrorStatus(false);
        }
    }, [value, limit, setErrorStatus]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/[^0-9]/g, "");

        if (input.length <= 2) {
            handleChange(input);
        }
    };

    const displayValue = value ? `${value}${unit}` : "";
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <InputWrapper>
            {label && <Label>{label}</Label>}
            <InputWrapper2>
                <Input
                    ref={inputRef}
                    onChange={handleInputChange}
                    value={displayValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    hasError={!!error}
                    {...props}
                />
                {limit !== undefined && (
                    <UnitWrapper hasError={!!error}>
                        / {limit}
                        {unit}
                    </UnitWrapper>
                )}
            </InputWrapper2>
            {error && <FormError>{error}</FormError>}
        </InputWrapper>
    );
};

export default ItemNumberInput;