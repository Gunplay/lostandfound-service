import React from "react";
import { Input } from "antd";
import styles from "./searchItemsInput.module.scss";
const { TextArea } = Input;
console.log("styles", styles);
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {};

const SearchItemsInput: React.FC = () => (
    <>
        <Input
            placeholder="Search..."
            showCount
            maxLength={30}
            onChange={onChange}
            className={styles.searchInput}
            //style={{ width: 300, height: 40, fontSize: "16px", fontWeight: "bold", color: "black", borderRadius: "10px 0 0 10px" }}
        />
    </>
);

export default SearchItemsInput;
