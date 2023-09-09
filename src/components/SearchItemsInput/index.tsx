import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log("Change:", e.target.value);
};

const SearchItemsInput: React.FC = () => (
    <>
        <Input
            placeholder="Search..."
            showCount
            maxLength={30}
            onChange={onChange}
            style={{ width: 300, height: 40, fontSize: "16px", fontWeight: "bold", color: "black", borderRadius: "10px 0 0 10px" }}
        />
    </>
);

export default SearchItemsInput;
