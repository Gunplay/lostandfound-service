import React, { useState } from "react";

import { AutoComplete, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select, DatePicker, Button, Steps, message } from "antd";
import { Divider, Typography } from "antd";

import { UpLoadImage } from "../../components";
import { ModalForm } from "../../components";
import { type } from "os";
import { setAdataFirstName, setAdataLastName, setAdataEmail, setAdataPhone } from "../../redux/form/slice";

import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;

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

// interface ThirdStepFormProps {
//     onClick: () => void;
//     setOpen: (open: boolean) => void;
//     // showModal: () => void;
// }

const ThirdStepForm: React.FC = () => {
    const dispatch = useDispatch();
    const { firstname, lastname, email, phone } = useSelector((store: RootState) => store.form.adData.user);

    const [openModal, setOpenModal] = useState(false);

    console.log("openModal", openModal);

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }} onChange={(defaultValue) => dispatch(setAdataPhone(defaultValue))}>
                <Option value="050">+050</Option>
                <Option value="068">+068</Option>
            </Select>
        </Form.Item>
    );

    const showModal = () => {
        setOpenModal(true);
    };

    return (
        <>
            <Form.Item
                name="firstname"
                label="First Name"
                tooltip="What do you want others to call you?"
                rules={[{ required: true, message: "Please input your nickname!", whitespace: true }]}
            >
                <Input value={firstname} onChange={(e) => dispatch(setAdataFirstName(e.target.value))} />
            </Form.Item>

            <Form.Item
                name="lastname"
                label="Last Name"
                tooltip="What do you want others to call you?"
                rules={[{ required: true, message: "Please input your nickname!", whitespace: true }]}
            >
                <Input value={lastname} onChange={(e) => dispatch(setAdataLastName(e.target.value))} />
            </Form.Item>

            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: "Please input your phone number!" }]}>
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} value={phone} onChange={(e) => dispatch(setAdataPhone(e.target.value))} />
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
                // valuePropName = {email}
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
                <Button type="primary" htmlType="submit" onClick={showModal}>
                    Register
                </Button>
                <ModalForm openModal={openModal} setOpenModal={setOpenModal} />
            </Form.Item>
        </>
    );
};

export default ThirdStepForm;
