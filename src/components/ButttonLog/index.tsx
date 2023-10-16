import React, { useState } from "react";
import { Button, Space } from "antd";
import { LoginOutlined } from "@ant-design/icons";

interface LogginAccBtnProps {
    style?: React.CSSProperties;
    classNames?: React.CSSProperties;
}

const ButtonLog: React.FC<LogginAccBtnProps> = ({ style, classNames }) => {
    const [loadings, setLoadings] = useState<boolean[]>([]);

    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };

    return (
        // <Space direction="horizontal" style={style}>
        <Space wrap>
            <Button
                icon={<LoginOutlined />}
                loading={loadings[0]}
                onClick={() => enterLoading(0)}
                style={{ backgroundColor: "black", color: "white" }}
                type="primary"
                size="middle"
            >
                Admin
            </Button>
            <Button icon={<LoginOutlined />} loading={loadings[0]} onClick={() => enterLoading(0)} type="primary" size="middle">
                User
            </Button>
        </Space>
        // </Space>
    );
};

export default ButtonLog;
