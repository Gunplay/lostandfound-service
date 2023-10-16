import React from "react";
import { Row, Col, Space, Divider } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Button } from "antd";
import { InstagramFilled, FacebookFilled } from "@ant-design/icons";

// const leftColStyle: React.CSSProperties = {
//     display: "flex",
//     justifyContent: "start",
//     alignItems: "flex-start",
//     color: "black",
//     fontSize: "50px",
// };

const rightColStyle: React.CSSProperties = {
    display: "flex",
    //flexDirection: "column",
    justifyContent: "end",
    alignItems: "flex-end",
    color: "black",
};

const logoStyle: React.CSSProperties = {
    color: "white",
    fontSize: "45px",
    fontWeight: "bold",
    opacity: 0.85,
};

export const FooterPanel: React.FC = () => {
    return (
        <Footer style={{ backgroundColor: "#464947" }}>
            <Row justify="space-evenly" wrap align="middle">
                {/* <Space align="baseline" direction="horizontal" size="large"> */}
                <Button type="dashed" ghost size="large">
                    Missing{" "}
                </Button>

                <Button type="dashed" ghost size="large">
                    Finds
                </Button>

                <Button type="dashed" ghost size="large">
                    Register ADD
                </Button>
                <Button type="dashed" ghost size="large">
                    LOGIN
                </Button>
                <Button type="dashed" ghost size="large">
                    SING UP
                </Button>
                {/* </Space> */}
            </Row>
            <Row>
                <Col xs={24} md={24} lg={24} xl={32} flex="auto">
                    <div style={logoStyle}>LOST & FOUND</div>
                </Col>
            </Row>
            {/* <Col xs = {4} sm = {16} md = {16} lg = {16} xl = {32}></Col>
            <Col xs = {4} sm = {16} md = {16} lg = {16} xl = {32}></Col> */}
            <Col></Col>
            <Row wrap justify="end">
                <Space align="baseline" direction="horizontal" size="large">
                    {/* <Col xs={6} sm={6} md={18} lg={24} xl={32} flex="auto"> */}
                    <Button icon={<InstagramFilled spin={true} />} size="large"></Button>
                    <Button icon={<FacebookFilled spin={true} />} size="large"></Button>
                    {/* </Col> */}
                </Space>
            </Row>
            <Row justify="space-evenly" wrap align="middle">
                {/* <Col xs={4} sm={16} md={16} lg={16} xl={32} flex="auto"> */}
                <Space align="baseline" direction="horizontal" size="large">
                    <Button type="default" ghost size="middle">
                        Thefinds4seekers@gmail.com
                    </Button>

                    <Button type="default" ghost size="middle">
                        2027 TheFinds4Seekers, Inc. All rights reserved.
                    </Button>
                </Space>
                {/* </Col> */}
            </Row>
        </Footer>
    );
};
