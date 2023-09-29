import React, { useState } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { FormResetData } from "../../redux/form/types";
import { setClearFormData } from "../../redux/form/slice";
interface ModalFormProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}
export const ModalForm: React.FC<ModalFormProps> = ({ openModal, setOpenModal }) => {
    //const [resetForm, setResetForm] = useState<FormResetData>(initialFormDataSend);

    const dispatch = useDispatch();
    const initialStateEmptyForm = useSelector((store: RootState) => store.form.adData);
    // const [open, setOpen] = useState(false);

    const {
        _id,
        title,
        description,
        photosData,
        location: { address, lat, lng },
        user: { firstname, lastname, email, phone },
        categoryId,
        lostOrFoundAt,
        createdAt,
        secretQuestion,
    } = useSelector((store: RootState) => store.form.adData);

    let photos = photosData.map((item) => item.originFileObj);

    const adDAta = {
        _id,
        title,
        description,
        photos,
        location: { address, lat, lng },
        user: { firstname, lastname, email, phone },
        categoryId,
        lostOrFoundAt,
        createdAt,
        secretQuestion,
    };

    const [confirmLoading, setConfirmLoading] = useState(false);

    const [modalText, setModalText] = useState("Your form has been sent, we’ll send you soon!");

    // const showModal = () => {
    //     setOpen && setOpen(true);
    // };

    const handleOk = () => {
        setConfirmLoading(true);
        setModalText("The modal will be closed after two seconds");
        setTimeout(() => {
            setOpenModal(false);
            setConfirmLoading(false);
            console.log("formDataSend", adDAta);
            dispatch(setClearFormData(initialStateEmptyForm));
        }, 2000);
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpenModal(false);
    };
    return (
        <>
            <Modal title="LOST THINGS" open={openModal} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
                <p style={{ fontSize: "23px" }}>{modalText}</p>
            </Modal>
        </>
    );
};
