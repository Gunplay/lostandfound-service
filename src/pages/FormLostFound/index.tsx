import React, { useState } from "react";
import type { CascaderProps } from "antd";
import { AutoComplete, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select, DatePicker, Button, Steps, message } from "antd";
import { Divider, Typography } from "antd";

import { UpLoadImage } from "../../components";
import { ModalForm } from "../../components";
import { type } from "os";

const { Title, Paragraph, Text, Link } = Typography;

interface ModalFormProps {
    visible: boolean;
    onClose: () => void;
    onClick?: () => void;
    children?: React.ReactNode;
}

const { Option } = Select;

interface DataNodeType {
    value: string;
    label: string;
    children?: DataNodeType[];
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const FormLostFound: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log("Received values of form: ", values);
    };

    const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

    const onWebsiteChange = (value: string) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult([".com", ".org", ".net"].map((domain) => `${value}${domain}`));
        }
    };

    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));

    // STEP
    const [formState, setFormState] = useState(initialState);

    const next = () => {
        setFormState({ ...formState, current: formState.current + 1 });
    };

    const prev = () => {
        setFormState({ ...formState, current: formState.current - 1 });
    };

    const resetForm = () => {
        setFormState(initialState);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {
        lineHeight: "260px",
        textAlign: "center",
        marginTop: 16,
    };

    const handle = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log("data", data);
    };
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            //initialValues={{ residence: ["zhejiang", "hangzhou", "xihu"], prefix: "86" }}
            style={{
                position: "absolute",
                top: 100,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 50,
                maxWidth: 680,
                maxHeight: 550,
                backgroundColor: "white",
                marginLeft: "15px",
                borderRadius: "15px",
                padding: "40px",
            }}
            scrollToFirstError
        >
            <Steps current={formState.current} items={items} style={{ width: "500px", marginLeft: "40px" }} />
            <div style={contentStyle}>{steps[formState.current].content}</div>
            <div style={{ display: "flex", justifyContent: "left", flexDirection: "column", padding: "25px" }}>
                <div>
                    {formState.current > 0 && (
                        <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                    {formState.current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {formState.current === steps.length - 1 && (
                        <ModalForm /> // Pass the required props to ModalForm
                    )}
                </div>
            </div>
        </Form>
    );
};

interface ButtonPropsState {
    name: string;
    type: string;
}

interface TitleState {
    label: string;
}

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

const SecondStepFrom = () => {
    return (
        <>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please input Description" }]}>
                <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item label="Choose photos of your lost:">
                <UpLoadImage />
            </Form.Item>

            <Form.Item name="time" label="Date when it was lost:">
                <DatePicker />
            </Form.Item>
        </>
    );
};

const ThirdStepForm = () => {
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="050">+050</Option>
                <Option value="068">+068</Option>
            </Select>
        </Form.Item>
    );
    return (
        <>
            <Form.Item
                name="firstname"
                label="First Name"
                tooltip="What do you want others to call you?"
                rules={[{ required: true, message: "Please input your nickname!", whitespace: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="lastname"
                label="Last Name"
                tooltip="What do you want others to call you?"
                rules={[{ required: true, message: "Please input your nickname!", whitespace: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: "Please input your phone number!" }]}>
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: "email",
                        message: "The input is not valid E-mail!",
                    },
                    {
                        required: true,
                        message: "Please input your E-mail!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement"))),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </>
    );
};
const steps = [
    {
        title: "First",
        content: <FirstStepForm />,
    },
    {
        title: "Second",
        content: <SecondStepFrom />,
    },
    {
        title: "Last",
        content: <ThirdStepForm />, // Pass the required props to ModalForm
        //content: <ModalForm visible={visible} onClose={onClose} />,
    },
];

const initialState = {
    current: 0,
};

export default FormLostFound;
