import React, { useState } from "react";
import { Form, Input, Select, Button, Typography, Space, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setAdataTitle, setAdataCategories, setAdataSwitcherLostOrFoundt, setAdataCreatedAt, setAdataSecretQuestion } from "../../redux/form/slice";
import ChooseTypeAd from "./ChooseTypeAd";
const { Title, Paragraph, Text, Link } = Typography;

const typeItems = ["Mobile Devices", "Keys", "Bags and purses", "Clothes", "Jewelry"];

const FirstStepForm: React.FC = () => {
    const dispatch = useDispatch();
    const { title, categories, switcherLostOrFound, createdAt, secretQuestion } = useSelector((store: RootState) => store.form.adData);
    console.log("switcherLostOrFound", switcherLostOrFound);

    return (
        <>
            <ChooseTypeAd />
            <Form.Item name="title" label={`ITEM ${switcherLostOrFound}`} rules={[{ required: true, message: `Please input your ${switcherLostOrFound.toLowerCase()} item` }]}>
                <Input size="large" type="text" value={title} onChange={(e) => dispatch(setAdataTitle(e.target.value))} placeholder="INPUT YOUR TITLE" />
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
                <Select size="large" onChange={(value) => dispatch(setAdataCategories(value))} placeholder="Choose category...">
                    {typeItems.map((item) => (
                        <Select.Option key={item} value={item}>
                            {item}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {switcherLostOrFound === "FOUND" ? (
                <>
                    <Tooltip title="Secret question (A person who will want to receive your contact information will have to give an answer to this. If you leave this field empty your contact details will be available to all users.): ">
                        <Form.Item name="secret question" label={`Secret question`} rules={[{ required: true, message: `` }]}>
                            <Input
                                value={createdAt}
                                onChange={(e) => dispatch(setAdataCreatedAt(e.target.value))}
                                size="large"
                                type="text"
                                placeholder="For Ex: Input ID number of passport..."
                            />
                        </Form.Item>
                    </Tooltip>
                    <Tooltip title="Secret answer (If a person answers exactly your question, how did you answer him, he will immediately receive your contact details. If not, you can check his answer in your account and give it if you want.):">
                        <Form.Item name="secret answer" label={`Secret answer`} rules={[{ required: true, message: `` }]}>
                            <Input
                                value={secretQuestion}
                                onChange={(e) => dispatch(setAdataSecretQuestion(e.target.value))}
                                size="large"
                                type="text"
                                placeholder="Your secret answer"
                            />
                        </Form.Item>
                    </Tooltip>
                </>
            ) : null}
        </>
    );
};

export default FirstStepForm;
