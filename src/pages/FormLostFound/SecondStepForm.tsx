import { Form, Input, DatePicker, Button } from "antd";
import type { DatePickerProps } from "antd";
import { UpLoadImage } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setAdataDataLostOrFound, setAdataDescription } from "../../redux/form/slice";

const SecondStepFrom = () => {
    const dispatch = useDispatch();
    const { description, dateLostOrFound, switcherLostOrFound } = useSelector((store: RootState) => store.form.adData);
    console.log("title", setAdataDescription);
    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        dispatch(setAdataDataLostOrFound(date, dateString));
    };

    return (
        <>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please input Description" }]}>
                <Input.TextArea
                    showCount
                    maxLength={100}
                    value={description}
                    onChange={(e) => dispatch(setAdataDescription(e.target.value))}
                    placeholder={
                        switcherLostOrFound === "LOST"
                            ? "Tell us more about your LOST For Ex: Special sings of your loss"
                            : "Tell us more about your FOUND For Ex: How much money do you want to recive as a reward..."
                    }
                />
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
