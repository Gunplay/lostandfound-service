import React from "react";
import { Form, Input, DatePicker, Tooltip, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { UpLoadImage } from "../../components";
import { RootState } from "../../redux/store";
import { setAdataDataLostOrFound, setAdataDescription, setAdataLocation } from "../../redux/form/slice";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

const SecondStepFrom: React.FC = () => {
    const dispatch = useDispatch();

    const {
        description,
        lostOrFoundAt,
        switcherLostOrFound,
        location: { address },
    } = useSelector((store: RootState) => store.form.adData);

    let dateValue;
    if (lostOrFoundAt === "") {
        dateValue = dayjs();
    } else {
        dateValue = dayjs(lostOrFoundAt);
    }

    const onHandleDatePicker: DatePickerProps["onChange"] = (e: Dayjs | null) => {
        if (e) {
            // !!!
            dispatch(setAdataDataLostOrFound(e.toString()));
        }
    };

    return (
        <Form>
            {/* Form.Item for Description */}
            <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please input Description" }]}>
                <Input.TextArea
                    showCount
                    maxLength={100}
                    defaultValue={description}
                    onChange={(e) => dispatch(setAdataDescription(e.target.value))}
                    placeholder={
                        switcherLostOrFound === "LOST"
                            ? "Tell us more about your LOST For Ex: Special signs of your loss"
                            : "Tell us more about your FOUND For Ex: How much reward money you want to receive..."
                    }
                />
            </Form.Item>

            <Form.Item label={switcherLostOrFound === "FOUND" ? "Choose photos of your found:" : "Choose photos of your lost:"}>
                <UpLoadImage />
            </Form.Item>

            <Tooltip title="(Choose it on the map above and change it if it is not correct):">
                <Form.Item
                    name="place"
                    label={switcherLostOrFound === "LOST" ? "Place where it was lost:" : "Place where it was found:"}
                    rules={[{ required: true, message: "Please input the location!" }]}
                >
                    <Input type="text" value={address} onChange={(e) => dispatch(setAdataLocation(e.target.value))} placeholder="Choose it on the map above..." />
                </Form.Item>
            </Tooltip>

            {/* Form.Item for Date */}
            <Form.Item name="date" label={switcherLostOrFound === "LOST" ? "Date when it was lost:" : "Date when it was found:"}>
                <DatePicker defaultValue={dateValue} onChange={onHandleDatePicker} />
            </Form.Item>
        </Form>
    );
};

export default SecondStepFrom;
