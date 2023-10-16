import React, { useState, useEffect } from "react";
import { Button, Space, Typography, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setAdataSwitcherLostOrFound } from "../../redux/form/slice";
import { RootState } from "../../redux/store";
import styles from "./chooseTypeAd.mudule.scss";

const { Title, Text } = Typography;

export const AD_LOST_TYPE_ID = 1;
export const AD_FOUND_TYPE_ID = 2;

const ChooseTypeAd = () => {
    const dispatch = useDispatch();
    const { typeId } = useSelector((store: RootState) => store.form.adData);
    const [titleClass, setTitleClass] = useState("smaller-title");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 800) {
                setTitleClass("smaller-title");
            } else if (window.innerWidth >= 600) {
                setTitleClass("smaller-title");
            }
            // Add more conditions as needed for different screen widths
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initialize the title class based on the initial screen width

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const handleTypeChange = (adType: number) => {
        dispatch(setAdataSwitcherLostOrFound(adType));
    };

    return (
        <>
            <Typography>
                <Row align="middle" justify="center" style={{ marginBottom: "10px" }}>
                    <Col xs={18} sm={22} md={24} lg={24} xl={32}>
                        <Title level={3}>REGISTRATION AD</Title>
                    </Col>
                </Row>
                {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", margin: "20px" }}> */}

                <Row align="middle" justify="center" style={{ marginBottom: "15px" }}>
                    <Col xs={14} sm={12} md={24} lg={24} xl={32}>
                        <Space>
                            <Text className={styles}>Choose the type of ad: </Text>
                        </Space>
                        <Button
                            size="large"
                            value={typeId}
                            type={typeId === AD_LOST_TYPE_ID ? "primary" : "default"}
                            onClick={() => handleTypeChange(AD_LOST_TYPE_ID)}
                            style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }}
                        >
                            LOST
                        </Button>
                        <Button
                            size="large"
                            value={typeId}
                            type={typeId === AD_FOUND_TYPE_ID ? "primary" : "default"}
                            onClick={() => handleTypeChange(AD_FOUND_TYPE_ID)}
                            style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
                        >
                            FOUND
                        </Button>
                    </Col>
                </Row>
                {/* </div> */}
            </Typography>
        </>
    );
};

export default ChooseTypeAd;
