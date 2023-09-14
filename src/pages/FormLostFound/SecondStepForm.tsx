import { Form, Input, DatePicker, Button } from "antd";
import type { DatePickerProps } from "antd";
import { UpLoadImage } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setAdataDataLostOrFound, setAdataDescription } from "../../redux/form/slice";

const SecondStepFrom = () => {
    const dispatch = useDispatch();
    const { description, dateLostOrFound } = useSelector((store: RootState) => store.form.adData);

    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(date, dateString);
        dispatch(setAdataDataLostOrFound(date, dateString));
    };

    return (
        <>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please input Description" }]}>
                <Input.TextArea showCount maxLength={100} value={description} onChange={(e) => dispatch(setAdataDescription(e.target.value))} />
            </Form.Item>

            <Form.Item label="Choose photos of your lost:">
                <UpLoadImage />
            </Form.Item>

            <Form.Item name="time" label="Date when it was lost:">
                <DatePicker value={dateLostOrFound} onChange={onChange} />
            </Form.Item>
        </>
    );
};

export default SecondStepFrom;
