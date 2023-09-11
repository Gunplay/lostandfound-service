import React, { useState } from "react";
import { AutoComplete, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select, DatePicker, Button, Steps, message } from "antd";
import { Divider, Typography } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

export const AD_LOST_TYPE_ID = 1;
export const AD_FOUND_TYPE_ID = 2;

const FirstStepForm: React.FC = () => {
    const [typeAd, setTypeAd] = useState(AD_LOST_TYPE_ID);

    const textTypeAd = typeAd === AD_LOST_TYPE_ID ? "LOST" : "FOUND";
    console.log("typeAd", typeAd);
    return (
        <>
            <Typography>
                <Title level={2}>REGISTRATION AD</Title>
                <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                    <Text>Choose the type of ad: </Text>
                    <Button
                        size="large"
                        type={typeAd === AD_LOST_TYPE_ID ? "primary" : "default"} // Provide a default value
                        onClick={(e) => {
                            e.preventDefault();
                            setTypeAd(AD_LOST_TYPE_ID);
                        }}
                        style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }}
                    >
                        LOST
                    </Button>
                    <Button
                        size="large"
                        type={typeAd === AD_FOUND_TYPE_ID ? "primary" : "default"} // Provide a default value
                        onClick={(e) => {
                            e.preventDefault();
                            setTypeAd(AD_FOUND_TYPE_ID);
                        }}
                        style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
                    >
                        FOUND
                    </Button>
                </div>
            </Typography>
            <Form.Item name="title" label={`ITEM  ${textTypeAd}`} rules={[{ required: true, message: "Please input your things" }]}>
                <Input size="large" />
            </Form.Item>
            <Form.Item
                name="category"
                label="Category"
                rules={[
                    {
                        required: true,
                        message: "Please Choose category of ad:",
                    },
                ]}
            >
                <Select size="large">
                    <Select.Option value="Mobile">Mobile Devices</Select.Option>
                    <Select.Option value="Keys">Keys</Select.Option>
                    <Select.Option value="Bags">Bags and purses</Select.Option>
                    <Select.Option value="Clothes">Clothes</Select.Option>
                    <Select.Option value="Jewelry">Jewelry</Select.Option>
                </Select>
            </Form.Item>
        </>
    );
};

export default FirstStepForm