import React, { FormEvent, useState, useEffect } from "react";

import { AutoComplete, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select, DatePicker, Button, Steps, message, UploadFile, UploadProps } from "antd";

import { type } from "os";
import FirstStepForm from "./FirstStepForm";
import SecondStepFrom from "./SecondStepForm";
import ThirdStepForm from "./ThirdStepForm";
import { ModalForm } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FormData } from "../../redux/form/types";
import { setAdataPhotos } from "../../redux/form/slice";

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

    // const formDataFromInitialState = useSelector((store: RootState) => store.form.adData);
    // const newdata = { ...formDataFromInitialState };

    const onFinish = (values: any) => {
        console.log("Received values of form: ", values);
    };

    const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);
    const [openModal, setOpenModal] = useState(false);

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

    const showModal = () => {
        setOpenModal(true);
    };
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

    // const handle = (event: any) => {
    //     event.preventDefault();
    //     const data = new FormData(newdata);
    //     console.log("dataFull", data);
    //     return data;
    // };

    // function onSubmit(e: FormEvent) {
    //     e.preventDefault();

    //     alert("Successful Account Creation");
    // }
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
                        <>
                            <Button type="primary" htmlType="submit" onClick={showModal}>
                                Register
                            </Button>
                            <ModalForm openModal={openModal} setOpenModal={setOpenModal} />
                        </>
                    )}
                </div>
            </div>
        </Form>
    );
};

// const updateFields = (fields: Partial<FormData>) => {
//     setData((prev) => {
//         return {
//             ...prev,
//             adData: {
//                 ...prev.adData,
//                 ...fields.adData,
//             },
//         };
//     });
// };

const steps = [
    {
        title: "First",
        content: <FirstStepForm />,
        //  content: <FirstStepForm data={data} setData={setData} updateFields={updateFields} />,
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
