"use client";

import React from "react";

import TextInput from "@sparcs-clubs/web/common/components/malloc/TextInput";
import ItemNumberInput from "@sparcs-clubs/web/common/components/malloc/ItemNumberInput";

const Malloc = () => (
    <div>
        <TextInput placeholder={"텍스트를 입력해주세요"}></TextInput>
        <ItemNumberInput placeholder={"개수를 입력해주세요"}></ItemNumberInput>
    </div>
);

export default Malloc;