import React, { useState } from "react";
import { Button, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setAdataSwitcherLostOrFoundt } from "../../redux/form/slice";
import { RootState } from "../../redux/store";
import { type } from "os";
const { Title, Text } = Typography;

export const AD_LOST_TYPE_ID = 1;
export const AD_FOUND_TYPE_ID = 2;

const ChooseTypeAd = () => {
    const dispatch = useDispatch();
    const { switcherLostOrFound } = useSelector((store: RootState) => store.form.adData);
    const [typeAd, setTypeAd] = useState(switcherLostOrFound); // Default to AD_LOST_TYPE_ID

    const handleTypeChange = (adType: string) => {
        // setTypeAd(adType);
        adType === "LOST" ? setTypeAd("LOST") : setTypeAd("FOUND");

        dispatch(setAdataSwitcherLostOrFoundt(adType));
    };
    return (
        <>
            <Typography>
                <Title level={2}>REGISTRATION AD</Title>
                <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                    <Text>Choose the type of ad: </Text>
                    <Button
                        size="large"
                        value={typeAd}
                        type={typeAd === "LOST" ? "primary" : "default"}
                        onClick={() => handleTypeChange("LOST")} // Pass AD_LOST_TYPE_ID
                        style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }}
                    >
                        LOST
                    </Button>
                    <Button
                        size="large"
                        type={typeAd === "FOUND" ? "primary" : "default"}
                        onClick={() => handleTypeChange("FOUND")} // Pass AD_FOUND_TYPE_ID
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
