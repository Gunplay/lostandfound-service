import React, { useState } from "react";
import { Form, Button, Steps } from "antd";
import FirstStepForm from "./FirstStepForm";
import SecondStepFrom from "./SecondStepForm";
import ThirdStepForm from "./ThirdStepForm";
import { ModalForm } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { firstStepSchemaLost, firstStepSchemaFound, yupSyncStepFirstFound, secondStepSchema, thirdStepSchema } from "./validatorForm";

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
    const dispatch = useDispatch();

    const { title, categories } = useSelector((store: RootState) => store.form.adData);

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

    const showModal = async () => {
        try {
            const schemas = [firstStepSchemaLost, firstStepSchemaFound, secondStepSchema, thirdStepSchema];
            await form.validateFields();
            const allFieldsFilled = schemas.every((schema) => schema.fields && Object.keys(schema.fields).length > 0);
            console.log("allFieldsFilled", allFieldsFilled);
            if (allFieldsFilled) {
                setOpenModal(true);
            } else {
                alert("Please fill in all fields.");
            }
        } catch (error) {
            console.error("Error during validation:", error);
        }
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

    const next = async () => {
        try {
            const schemas = [firstStepSchemaLost, secondStepSchema, thirdStepSchema, firstStepSchemaFound];
            const currentSchema = schemas[formState.current];
            if (currentSchema) {
                const values = await form.validateFields();
                await currentSchema.validate(values, { abortEarly: false });
                setFormState({ ...formState, current: formState.current + 1 });
            }
        } catch (errorInfo) {
            console.error("Error during validation:", errorInfo);
        }
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

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
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
                margin: "0 auto",
                borderRadius: "15px",
                padding: "40px",
            }}
            scrollToFirstError
        >
            <Steps current={formState.current} items={items} style={{ marginLeft: "40px" }} />
            <div style={contentStyle}>{steps[formState.current].content}</div>
            <div style={{ display: "flex", justifyContent: "left", flexDirection: "column", padding: "25px" }}>
                <div>
                    {formState.current > 0 && (
                        <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                    {formState.current < steps.length - 1 && (
                        <Button
                            type="primary"
                            onClick={(e) => {
                                next();
                                console.log("formState.current", formState.current);
                            }}
                        >
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
        content: <ThirdStepForm />,
    },
];

const initialState = {
    current: 0,
};

export default FormLostFound;
