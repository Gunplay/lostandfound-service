import React, { useState, useEffect } from "react";
import { Form, Button, Steps, Row, Col } from "antd";
import styles from "./formLostFound.module.scss";
import FirstStepForm from "./FirstStepForm";
import SecondStepFrom from "./SecondStepForm";
import ThirdStepForm from "./ThirdStepForm";
import { ModalForm } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { firstStepSchemaLost, firstStepSchemaFound, yupSyncStepFirstFound, secondStepSchema, thirdStepSchema } from "./validatorForm";
console.log("styles", styles);

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

    const { title, categories, switcherLostOrFound } = useSelector((store: RootState) => store.form.adData);

    const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [formHeight, setFormHeight] = useState(40);
    const [formInnerHeightForm, setFormInnerHeightForm] = useState(0);

    useEffect(() => {
        function handleResize() {
            const windowWidth = window.innerWidth;
            let newFormHeight = 40;
            let newFormInnerHeightForm = 0;

            if (windowWidth <= 1038) {
                newFormHeight = 150;
                newFormInnerHeightForm = 600;
            } else if (windowWidth <= 598) {
                newFormHeight = 250;
                newFormInnerHeightForm = 700;
            } else if (windowWidth <= 559) {
                newFormHeight = 250;
                newFormInnerHeightForm = 750;
            } else {
                newFormHeight = 100; // Default height for larger screens
                newFormInnerHeightForm = 550;
            }

            setFormHeight(newFormHeight);
            setFormInnerHeightForm(newFormInnerHeightForm);
        }

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                console.log("Please fill in all fields.");
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
        // <div className={styles.formWrap}>
        <Row justify="center" className={`${styles.formWrap} ${switcherLostOrFound === "FOUND" ? styles.found : ""}`}>
            <Col xs={18} sm={20} md={20} lg={20} xl={20} flex="auto">
                <Form {...formItemLayout} form={form} name="register" scrollToFirstError>
                    <Steps
                        current={formState.current}
                        items={items}
                        style={{ display: "flex", justifyContent: "center", flexDirection: "inherit", maxWidth: "600px", margin: "15px auto" }}
                    />
                    <div style={{ textAlign: "center", marginTop: "16px" }}>{steps[formState.current].content}</div>
                    <div>
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
            </Col>
        </Row>
        // </div>
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
