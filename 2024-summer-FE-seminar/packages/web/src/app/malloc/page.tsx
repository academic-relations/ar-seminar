"use client";

import React, {useState} from "react";

import TextInput from "@sparcs-clubs/web/common/components/malloc/TextInput";
import ItemNumberInput from "@sparcs-clubs/web/common/components/malloc/ItemNumberInput";

const Malloc = () => {
    const [text, setText] = useState("");
    const [item, setItem] = useState("");
    return (<div>
        <TextInput placeholder={"텍스트를 입력해주세요"} value={text} handleChange={setText}></TextInput>
        <ItemNumberInput placeholder={"개수를 입력해주세요"} value={item} handleChange={setItem}></ItemNumberInput>
    </div>);
};

export default Malloc;