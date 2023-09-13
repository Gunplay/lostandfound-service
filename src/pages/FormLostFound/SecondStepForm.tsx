import { Form, Input, DatePicker, Button } from "antd";

import { UpLoadImage } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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

export default SecondStepFrom;
