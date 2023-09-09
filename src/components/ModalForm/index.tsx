import React, { useState } from "react";
import { Button, Modal } from "antd";

export const ModalForm: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("Your form has been sent, we’ll send you soon!");

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText("The modal will be closed after two seconds");
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Confrim sending form
            </Button>
            <Modal title="LOST THINGS" open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
                <p style={{ fontSize: "23px" }}>{modalText}</p>
            </Modal>
        </>
    );
};
