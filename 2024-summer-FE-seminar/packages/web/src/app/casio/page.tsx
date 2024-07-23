"use client"

import React, {useState} from "react"

import TextInput from "@sparcs-clubs/web/common/components/casio/TextInput";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";

const Casio : React.FC = () => {
    const [ textValue, setTextValue ] = useState("");

    const [numberValue, setNumberValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);

    const handleNumberChange = (value: string) => {
        setNumberValue(value);
        const numberValue = parseInt(value.replace(/개$/, ""), 10);
        if (isNaN(numberValue)) {
          setErrorMessage("입력은 숫자여야 합니다");
          setHasError(true);
        } else if (numberValue > 99) {
          setErrorMessage("입력은 99보다 작아야합니다.");
          setHasError(true);
        } else {
          setErrorMessage("");
          setHasError(false);
        }
      };
    
    return(
  <div>
    <TextInput 
    placeholder=""
    value = {textValue}
    handleChange={(value : string) => {setTextValue(value);}}
    ></TextInput>
    <ItemNumberInput
          label="숫자 입력"
          placeholder="숫자를 입력하세요"
          disabled={false}
          value={numberValue}
          errorMessage={errorMessage}
          handleChange={handleNumberChange}
          setErrorStatus={setHasError}
    />
  </div>
    );
}


export default Casio;