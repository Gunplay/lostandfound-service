import React, { useState } from "react";
import { Form, Input, Select, Button, Typography } from "antd"; // Import Typography
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const { Title, Text } = Typography;

import { setAdataTitle, setAdataCategories, setAdataLostOrFoundAt } from "../../redux/form/slice";
export const AD_LOST_TYPE_ID = 1;
export const AD_FOUND_TYPE_ID = 2;

const typeItems = ["Mobile Devices", "Keys", "Bags and purses", "Clothes", "Jewelry"];

const FirstStepForm: React.FC = () => {
    const dispatch = useDispatch();
    const { title, categories } = useSelector((store: RootState) => store.form.adData);

    const [typeAd, setTypeAd] = useState(AD_LOST_TYPE_ID);

    const textTypeAd = typeAd === AD_LOST_TYPE_ID ? "LOST" : "FOUND";

    const handleTypeChange = (adType: number) => {
        setTypeAd(adType);
    };

    return (
        <>
            <Typography>
                <Title level={2}>REGISTRATION AD</Title>
                <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                    <Text>Choose the type of ad: </Text>
                    <Button
                        size="large"
                        type={typeAd === AD_LOST_TYPE_ID ? "primary" : "default"}
                        onClick={(e) => {
                            const input = e.target as HTMLElement;
                            handleTypeChange(AD_LOST_TYPE_ID), dispatch(setAdataLostOrFoundAt(input.innerText));
                        }}
                        style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }}
                    >
                        LOST
                    </Button>
                    <Button
                        size="large"
                        type={typeAd === AD_FOUND_TYPE_ID ? "primary" : "default"}
                        onClick={(e) => {
                            const input = e.target as HTMLElement;
                            handleTypeChange(AD_FOUND_TYPE_ID), dispatch(setAdataLostOrFoundAt(input.innerText));
                        }}
                        style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
                    >
                        FOUND
                    </Button>
                </div>
            </Typography>
            <Form.Item name="title" label={`ITEM ${textTypeAd}`} rules={[{ required: true, message: `Please input your ${textTypeAd.toLowerCase()} item` }]}>
                <Input size="large" type="text" value={title} onChange={(e) => dispatch(setAdataTitle(e.target.value))} />
            </Form.Item>
            <Form.Item
                name="category"
                label="Category"
                rules={[
                    {
                        required: true,
                        message: "Please choose a category for the ad",
                    },
                ]}
            >
                <Select size="large" onChange={(value) => dispatch(setAdataCategories(value))}>
                    {typeItems.map((item) => (
                        <Select.Option key={item} value={item}>
                            {item}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </>
    );
};

export default FirstStepForm;
