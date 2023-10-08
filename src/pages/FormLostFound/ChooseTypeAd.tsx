import React, { useState } from "react";
import { Button, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setAdataSwitcherLostOrFound } from "../../redux/form/slice";
import { RootState } from "../../redux/store";
import { type } from "os";
const { Title, Text } = Typography;

export const AD_LOST_TYPE_ID = 1;
export const AD_FOUND_TYPE_ID = 2;

const ChooseTypeAd = () => {
    const dispatch = useDispatch();
    const { typeId } = useSelector((store: RootState) => store.form.adData);

    const handleTypeChange = (adType: number) => {
        // setTypeAd(adType);

        dispatch(setAdataSwitcherLostOrFound(adType));
    };
    return (
        <>
            <Typography>
                <Title level={2}>REGISTRATION AD</Title>
                <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                    <Text>Choose the type of ad: </Text>
                    <Button
                        size="large"
                        value={typeId}
                        type={typeId === AD_LOST_TYPE_ID ? "primary" : "default"}
                        onClick={() => handleTypeChange(AD_LOST_TYPE_ID)} // Pass AD_LOST_TYPE_ID
                        style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }}
                    >
                        LOST
                    </Button>
                    <Button
                        size="large"
                        value={typeId}
                        type={typeId === AD_FOUND_TYPE_ID ? "primary" : "default"}
                        onClick={() => handleTypeChange(AD_FOUND_TYPE_ID)} // Pass AD_FOUND_TYPE_ID
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
