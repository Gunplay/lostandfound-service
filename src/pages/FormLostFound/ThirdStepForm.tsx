import React, { useState } from "react";

import { AutoComplete, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select, DatePicker, Button, Steps, message } from "antd";
import { Divider, Typography } from "antd";

import { UpLoadImage } from "../../components";
import { ModalForm } from "../../components";
import { type } from "os";
import {
    setAdataFirstName,
    setAdataLastName,
    setAdataEmail,
    setAdataPhonePrefix,
    setAdataPhonePrefixUpdate,
    setAdataPhoneMainUpdate,
    setAdataChecked,
} from "../../redux/form/slice";

import { RootState, store } from "../../redux/store";
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
    const aDataChecked = useSelector((store: RootState) => store.form.adData.checked);

    // const [openModal, setOpenModal] = useState(false);

    // const showModal = () => {
    //     setOpenModal(true);
    // };
    const handlePhonePrefixChange = (value: string) => {
        if (/^[+]?\d*$/.test(value)) {
            // Проверка, что value содержит только положительные числа
            dispatch(setAdataPhonePrefixUpdate(value));
        }
    };

    const handlePhoneMainChange = (event: any) => {
        const value = event.target.value;
        if (/^[+]?\d*$/.test(value)) {
            // Проверка, что value содержит только положительные числа
            dispatch(setAdataPhoneMainUpdate(value));
        }
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }} onChange={handlePhonePrefixChange}>
                <Option value="+380">+380</Option>
                <Option value="+360">+360</Option>
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
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} value={phone} onChange={handlePhoneMainChange} type="number" />
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
                <Input value={email} onChange={(e) => dispatch(setAdataEmail(e.target.value))} />
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
                <Checkbox value={aDataChecked} onChange={(e) => dispatch(setAdataChecked(e.target.checked))}>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item>
            {/* <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" onClick={showModal}>
                    Register
                </Button>
                <ModalForm openModal={openModal} setOpenModal={setOpenModal} />
            </Form.Item> */}
        </>
    );
};

export default ThirdStepForm;
