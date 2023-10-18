import React, { useState, useEffect } from "react";
import { Button, Typography, Row, Col, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setAdataSwitcherLostOrFound, setAdataSwitcherLostOrFoundText } from "../../redux/form/slice";
import { RootState } from "../../redux/store";
import styles from "./chooseTypeAd.mudule.scss";
const { Title, Text } = Typography;

export const AD_LOST_TYPE_ID = 1;
export const AD_FOUND_TYPE_ID = 2;

const ChooseTypeAd = () => {
    const dispatch = useDispatch();
    const { typeId } = useSelector((store: RootState) => store.form.adData);
    const [sizeTitleSize, setTitleSize] = useState<1 | 2 | 4 | 3 | 5 | undefined>(3);

    const [sizeButton, setSizeButton] = useState<"small" | "middle" | "large">("large");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 366) {
                setSizeButton("middle");
            } else if (window.innerWidth <= 397) {
                setSizeButton("middle");
                setTitleSize(5);
            } else if (window.innerWidth <= 518) {
                setSizeButton("large");
                setTitleSize(5);
            } else if (window.innerWidth <= 900) {
                setTitleSize(4);
            } else {
                setSizeButton("large");
                setTitleSize(2);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Инициализация размера кнопок

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
                        <Title level={sizeTitleSize}>REGISTRATION AD</Title>
                    </Col>
                </Row>
                <Row align="middle" justify="center" style={{ marginBottom: "10px" }}>
                    <Col>
                        <Text className={styles.fontSizeTittle}>Choose the type of ad: </Text>
                    </Col>
                </Row>
                <Row align="middle" justify="center" style={{ marginBottom: "15px" }}>
                    <Col>
                        <Button
                            size={sizeButton}
                            value={typeId}
                            type={typeId === AD_LOST_TYPE_ID ? "primary" : "default"}
                            style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px", fontSize: sizeButton === "small" ? "12px" : "18px" }}
                            onClick={() => {
                                handleTypeChange(AD_LOST_TYPE_ID);
                                dispatch(setAdataSwitcherLostOrFoundText("LOST"));
                            }}
                        >
                            LOST
                        </Button>
                        <Button
                            size={sizeButton}
                            value={typeId}
                            type={typeId === AD_FOUND_TYPE_ID ? "primary" : "default"}
                            style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px", fontSize: sizeButton === "small" ? "12px" : "18px" }}
                            onClick={() => {
                                handleTypeChange(AD_FOUND_TYPE_ID);
                                dispatch(setAdataSwitcherLostOrFoundText("FOUND"));
                            }}
                        >
                            FOUND
                        </Button>
                    </Col>
                </Row>
            </Typography>
        </>
    );
};

export default ChooseTypeAd;
