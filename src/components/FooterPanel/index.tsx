import React from "react";
import { Row, Col, Space, Divider } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Button } from "antd";
import { InstagramFilled, FacebookFilled } from "@ant-design/icons";

const leftColStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "start",
    alignItems: "flex-start",
    color: "black",
    fontSize: "50px",
};

const rightColStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
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
            <Row style={leftColStyle}>
                <Space size="middle">
                    <Col>
                        <Button type="dashed" ghost size="large">
                            Missing{" "}
                        </Button>
                    </Col>
                    <Col>
                        <Button type="dashed" ghost size="large">
                            Finds
                        </Button>
                    </Col>
                    <Col>
                        <Button type="dashed" ghost size="large">
                            Register ADD
                        </Button>
                    </Col>
                    <Col>
                        <Button type="dashed" ghost size="large">
                            LOGIN
                        </Button>
                    </Col>
                    <Col>
                        <Button type="dashed" ghost size="large">
                            SING UP
                        </Button>
                    </Col>
                </Space>
            </Row>
            <div style={logoStyle}>LOST & FOUND</div>
            <Row style={rightColStyle}>
                <Space size="middle">
                    <Button icon={<InstagramFilled spin={true} />} size="large"></Button>
                    <Button icon={<FacebookFilled spin={true} />} size="large"></Button>
                </Space>
                <Space size="middle" style={{ marginTop: "15px" }}>
                    <Col>
                        <Button type="default" ghost size="large">
                            Thefinds4seekers@gmail.com
                        </Button>
                    </Col>
                    <Col>
                        <Button type="default" ghost size="large">
                            2027 TheFinds4Seekers, Inc. All rights reserved.
                        </Button>
                    </Col>
                </Space>
            </Row>
        </Footer>
    );
};
