import React, { useState } from "react";

import { AutoComplete, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select, DatePicker, Button, Steps, message } from "antd";

import { ModalForm } from "../../components";
import { type } from "os";
import FirstStepForm from "./FirstStepForm";
import SecondStepFrom from "./SecondStepForm";
import ThirdStepForm from "./ThirdStepForm";

// interface ModalFormProps {
//     visible: boolean;
//     onClose: () => void;
//     onClick?: () => void;
//     children?: React.ReactNode;
// }

// interface DataNodeType {
//     value: string;
//     label: string;
//     children?: DataNodeType[];
// }

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
                    {/* {formState.current === steps.length - 1 && (
                        <ModalForm /> // Pass the required props to ModalForm
                    )} */}
                </div>
            </div>
        </Form>
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
