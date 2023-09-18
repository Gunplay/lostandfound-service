import React, { useState } from "react";
import { Button, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setAdataSwitcherLostOrFoundt } from "../../redux/form/slice";
const { Title, Text } = Typography;

export const AD_LOST_TYPE_ID = 1;
export const AD_FOUND_TYPE_ID = 2;

const ChooseTypeAd = () => {
    const dispatch = useDispatch();
    const [typeAd, setTypeAd] = useState(1); // Default to AD_LOST_TYPE_ID

    const handleTypeChange = (adType: number) => {
        setTypeAd(adType);
        dispatch(setAdataSwitcherLostOrFoundt(adType === 1 ? "LOST" : "FOUND"));
    };

    return (
        <>
            <Typography>
                <Title level={2}>REGISTRATION AD</Title>
                <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                    <Text>Choose the type of ad: </Text>
                    <Button
                        size="large"
                        type={typeAd === 1 ? "primary" : "default"}
                        onClick={() => handleTypeChange(1)} // Pass AD_LOST_TYPE_ID
                        style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }}
                    >
                        LOST
                    </Button>
                    <Button
                        size="large"
                        type={typeAd === 2 ? "primary" : "default"}
                        onClick={() => handleTypeChange(2)} // Pass AD_FOUND_TYPE_ID
                        style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
                    >
                        FOUND
                    </Button>
                </div>
            </Typography>
        </>
    );
};

export default ChooseTypeAd;
