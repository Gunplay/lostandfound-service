import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

const onFinish = (values: any) => {
    console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
};

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const TestForm: React.FC = () => {
    const handle = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log("data", data);
    };
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType> label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input />
            </Form.Item>

            <Form.Item<FieldType> label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" onSubmit={handle}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TestForm;
