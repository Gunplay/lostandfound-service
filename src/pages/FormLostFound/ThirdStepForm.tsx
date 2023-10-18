import React, { useState } from "react";

import { Checkbox, Form, Input, Select, Row, Col } from "antd";
import { Divider, Typography } from "antd";

import { type } from "os";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
    setAdataFirstName,
    setAdataLastName,
    setAdataEmail,
    setAdataPhonePrefix,
    setAdataPhonePrefixUpdate,
    setAdataPhoneMainUpdate,
    setAdataChecked,
} from "../../redux/form/slice";
import { yupSyncStepThirdStepSchema } from "./validatorForm";
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

const ThirdStepForm: React.FC = () => {
    const dispatch = useDispatch();
    const { firstname, lastname, email, phone } = useSelector((store: RootState) => store.form.adData.user);
    const aDataChecked = useSelector((store: RootState) => store.form.adData.checked);

    // const [openModal, setOpenModal] = useState(false);

    // const showModal = () => {
    //     setOpenModal(true);
    // };
    // const handlePhonePrefixChange = (value: string) => {
    //     // if (/^[+]?\d*$/.test(value)) {
    //     // Проверка, что value содержит только положительные числа
    //     dispatch(setAdataPhonePrefixUpdate(value));
    //     // }
    // };

    // const handlePhoneMainChange = (event: any) => {
    //     const value = event.target.value;
    //     //  if (/^[+]?\d*$/.test(value)) {
    //     // Проверка, что value содержит только положительные числа
    //     dispatch(setAdataPhoneMainUpdate(value));
    //     // }
    // };
    const handlePhoneChange = (value: string, data: any, event: React.ChangeEvent<HTMLInputElement>) => {
        // Обработка изменения номера телефона
        // value - новое значение номера телефона
        // data - объект с данными о номере телефона (код страны, код региона и т. д.)
        // event - событие изменения поля ввода
        dispatch(setAdataPhonePrefixUpdate(data.countryCode)); // Устанавливаем код страны
        dispatch(setAdataPhoneMainUpdate(value)); // Устанавливаем номер телефона
    };
    // const prefixSelector = (
    //     <Form.Item name="prefix" rules={[yupSyncStepThirdStepSchema]} noStyle>
    //         <Select style={{ width: 70 }} onChange={handlePhonePrefixChange}>
    //             <Option value="+380">+380</Option>
    //             <Option value="+360">+360</Option>
    //         </Select>
    //     </Form.Item>
    // );

    return (
        <>
            <Form.Item
                name="firstname"
                label="First Name"
                tooltip="What do you want others to call you?"
                //rules={[{ required: true, message: "Please input your nickname!", whitespace: true }]}
                rules={[yupSyncStepThirdStepSchema]}
            >
                <Input value={firstname} onChange={(e) => dispatch(setAdataFirstName(e.target.value))} />
            </Form.Item>

            <Form.Item
                name="lastname"
                rules={[yupSyncStepThirdStepSchema]}
                label="Last Name"
                tooltip="What do you want others to call you?"
                // rules={[{ required: true, message: "Please input your nickname!", whitespace: true }]}
            >
                <Input value={lastname} onChange={(e) => dispatch(setAdataLastName(e.target.value))} />
            </Form.Item>

            {/* <Form.Item
                rules = {[yupSyncStepThirdStepSchema]}
                name  = "phone"
                label = "Phone Number"
                    //rules = {[{ required: true, message: "Please input your phone number!" }]}
            >
                <Input addonBefore = {prefixSelector} style = {{ width: "100%" }} value = {phone} onChange = {handlePhoneMainChange} type = "number" />
            </Form.Item> */}
            <Form.Item rules={[yupSyncStepThirdStepSchema]} name="phone" label="Phone Number">
                <PhoneInput
                    value={phone}
                    inputProps={{
                        name: "phone",
                        required: true,
                    }}
                    preferredCountries={["us", "ua"]}
                    onChange={handlePhoneChange}
                    containerClass="phone-input-container"
                    inputClass="phone-input"
                    placeholder="Phone"
                    //fluid
                />
            </Form.Item>
            <Form.Item name="email" rules={[yupSyncStepThirdStepSchema]} label="E-mail">
                <Input value={email} onChange={(e) => dispatch(setAdataEmail(e.target.value))} />
            </Form.Item>

            {/* <Form.Item rules={[yupSyncStepThirdStepSchema]} name="agreement" valuePropName="checked">
                <Checkbox value={aDataChecked} onChange={(e) => dispatch(setAdataChecked(e.target.checked))}>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item> */}
        </>
    );
};

export default ThirdStepForm;
