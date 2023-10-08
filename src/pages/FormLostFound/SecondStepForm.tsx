import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, DatePicker, Tooltip } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { RootState } from "../../redux/store";
import { setAdataDescription, setAdataLocation, setAdataDataLostOrFound } from "../../redux/form/slice";
import { UpLoadImage } from "../../components";
import * as yup from "yup";
import { yupSyncStepSecond } from "./validatorForm";

const { TextArea } = Input;

const SecondStepFrom: React.FC = () => {
    const dispatch = useDispatch();

    const {
        description,
        lostOrFoundAt,
        typeId,
        location: { address },
    } = useSelector((store: RootState) => store.form.adData);

    //let dateValue: Dayjs | null = null;
    const dateValue: Dayjs | undefined = lostOrFoundAt ? dayjs(lostOrFoundAt) : undefined;

    // if (lostOrFoundAt) {
    //     dateValue = dayjs(lostOrFoundAt);
    // }

    const onHandleDatePicker = (date: Dayjs | null) => {
        if (date) {
            dispatch(setAdataDataLostOrFound(date.toISOString()));
        }
    };

    return (
        <>
            <Form.Item name="description" label="Description" rules={[yupSyncStepSecond]}>
                <TextArea
                    style={{ resize: "none" }}
                    showCount
                    maxLength={200}
                    value={description}
                    onChange={(e) => dispatch(setAdataDescription(e.target.value))}
                    placeholder={typeId === 1 ? "Tell us more about your LOST..." : "Tell us more about your FOUND..."}
                />
            </Form.Item>

            <Form.Item name="photos" label={typeId === 2 ? "Choose photos of your found:" : "Choose photos of your lost:"}>
                <UpLoadImage />
            </Form.Item>

            <Tooltip title="Choose it on the map above and change it if it is not correct:">
                <Form.Item
                    name="place"
                    label={typeId === 1 ? "Place where it was lost:" : "Place where it was found:"}
                    // rules={[{ required: true, message: "Please input the location!" }]}
                >
                    <Input type="text" value={address} onChange={(e) => dispatch(setAdataLocation(e.target.value))} placeholder="Choose it on the map above..." />
                </Form.Item>
            </Tooltip>

            <Form.Item name="date" rules={[yupSyncStepSecond]} label={typeId === 1 ? "Date when it was lost:" : "Date when it was found:"}>
                <DatePicker value={dateValue} onChange={onHandleDatePicker} />
            </Form.Item>
        </>
    );
};

export default SecondStepFrom;
