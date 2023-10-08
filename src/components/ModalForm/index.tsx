import React, { useState } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// import { FormResetData } from "../../redux/form/types";
import { setClearFormData } from "../../redux/form/slice";
import API from "../../utils/API";

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
        // _id,
        title,
        description,
        photosData,
        typeId,

        location: { address, lat, lng },
        user: { firstname, lastname, email, phone },
        categoryId,
        lostOrFoundAt,
        createdAt,
        secretQuestion,
    } = useSelector((store: RootState) => store.form.adData);
    // console.log("photosData", photosData);
    let photos = photosData.map((item) => {
        if (item.originFileObj) {
            return item.originFileObj;
        }
    });
    // if (item.originFileObj) {
    //     const { lastModified, lastModifiedDate, name, size, type, webkitRelativePath } = item.originFileObj;
    //     return {
    //         lastModified,
    //         lastModifiedDate,
    //         name,
    //         size,
    //         type,
    //         webkitRelativePath,
    //     };
    // }
    //return URL.createObjectURL(item.originFileObj);
    //});
    // if (photos[0]) {
    // console.log("photos", photos);
    // }
    // const transformedCategoriesId = categoryId.map((category) => category._id);

    const adFormData = {
        // _id,
        title,
        description,
        photos,
        typeId: String(typeId),
        location: { address, lat, lng },
        user: { firstname, lastname, email, phone },
        categoryId, // id!!
        lostOrFoundAt,
        createdAt,
        secretQuestion,
    };
    console.log("adFormData!!!!!!!!!!!!!!!!!!!!!!!!!", adFormData.photos);
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
            console.log("formDataSend", adFormData);
            dispatch(setClearFormData(initialStateEmptyForm));
        }, 2000);
        API.post("/ads", adFormData).then((res) => {
            console.log("formDataSend", res);
        });
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
