import React, { useRef } from "react";

import { Button, Space } from "antd";
import { Row, Col, Divider } from "antd";
import { Link } from "react-router-dom";

interface ButtonName {
    [key: string]: string;
    btn1: string;
    btn2: string;
    btn3: string;
}

// const buttonName: ButtonName = {
//     btn1: "SUBMIT LOST ITEM",
//     btn2: "SUBMIT FOUND ITEM",
//     btn3: "VIEW RECENT POSTS",
// };

// const styleButtonSubmit: React.CSSProperties = {
//   display: 'grid',
//   gridColumnEnd: 'auto',
//   columnGap: 'normal',

// };

interface ButtonSubmitProps {
    size: "large" | "middle" | "small";
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ size }) => {
    return (
        <Space wrap>
            {/* {Object.keys(buttonName).map((key) => (
            <Row key={key}>
            </Row>
            <Button size = {size} type = "default">
                {buttonName[key]}
            </Button>
        ))} */}
            <a href="#viewrecentitems">
                <Button size={size} type="default">
                    VIEW RECENT POSTS
                </Button>
            </a>
        </Space>
    );
};

export default ButtonSubmit;
