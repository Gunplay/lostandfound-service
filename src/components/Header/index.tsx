import React, { useEffect, useState } from "react";
import "antd/dist/antd";
import { Layout, Space, Row, Col, Divider, Button } from "antd";
import { AppstoreAddOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
//import AccountBtn from './AccountBtn';
import ButtonSubmit from "../ButtonSubmit";
//import LogginAccBtn from './LogginAccBtn';
import ButtonLog from "../ButttonLog";
import SearchItemsInput from "../SearchItemsInput";
import styles from "./header.module.scss";
const { Header } = Layout;

const headerStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    position: "fixed",
    width: "100%",
    zIndex: 69,
};

const logoStyle: React.CSSProperties = {
    color: "black",
    backgroundColor: "gray",
    borderRadius: "2%",
    border: "0.5px solid white",
    //padding: "5px",
    fontSize: "25px",
    fontWeight: "bold",
    opacity: 0.85,
};

export const HeaderPanel: React.FC = () => {
    return (
        <Header style={headerStyle}>
            <Row>
                <Col flex="auto">
                    <Space>
                        <Link to="/">
                            <Button icon={<HomeOutlined />} type="dashed" size="large" ghost></Button>
                        </Link>
                        <ButtonLog />
                    </Space>
                </Col>
                <Col flex="auto">
                    <ButtonSubmit />
                </Col>
                <Col flex="auto">
                    <SearchItemsInput />
                    <Button icon={<AppstoreAddOutlined rotate={5} spin />} type="primary" danger className={styles.buttonCreateAdd}>
                        CREATE AD
                    </Button>
                </Col>
                {/* <div style={logoStyle}>LOST & FOUND</div> */}
            </Row>
        </Header>
    );
};
