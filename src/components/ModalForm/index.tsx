import React, { useState } from "react";
import { Modal } from "antd";

interface ModalFormProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}
export const ModalForm: React.FC<ModalFormProps> = ({ openModal, setOpenModal }) => {
    // const [open, setOpen] = useState(false);
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
