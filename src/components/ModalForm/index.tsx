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
    const [responseData, setResponseData] = useState<any>(null);

    // console.log("dataRes", responseData);
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
        secretAnswer,
        switcherLostOrFound,
    } = useSelector((store: RootState) => store.form.adData);

    let photos = photosData.map((item) => {
        if (item.originFileObj) {
            return item.originFileObj;
        }
    });

    const adFormData = new FormData();
    adFormData.append("title", title);
    adFormData.append("description", description);

    adFormData.append("typeId", String(typeId));
    console.log("categoryId", categoryId);
    adFormData.append("categoryId", categoryId);

    adFormData.append("location[address]", address);
    adFormData.append("location[lat]", lat);
    adFormData.append("location[lng]", lng);

    adFormData.append("user[firstname]", firstname);
    adFormData.append("user[lastname]", lastname);
    adFormData.append("user[email]", email);
    adFormData.append("user[phone]", phone);

    adFormData.append("lostOrFoundAt", lostOrFoundAt);

    photos.forEach((photo) => {
        adFormData.append("photos", photo as Blob);
    });
    if (secretQuestion && secretQuestion.length && secretAnswer && secretAnswer.length) {
        adFormData.append("secretQuestion", secretQuestion);
        adFormData.append("secretAnswer", secretAnswer);
    }

    const [confirmLoading, setConfirmLoading] = useState(false);

    const [modalText, setModalText] = useState("If you are sure that your completed data is correct, then press the 'OK' button and the form will go!!");

    // const showModal = () => {
    //     setOpen && setOpen(true);
    // };

    const handleOk = () => {
        setConfirmLoading(true);
        setModalText("Your data was sent");
        setTimeout(() => {
            setOpenModal(false);
            setConfirmLoading(false);
            dispatch(setClearFormData(initialStateEmptyForm));
        }, 6000);

        API.post("/ads", adFormData)
            .then((res) => {
                setResponseData(res);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpenModal(false);
    };

    // if (responseData && responseData.data && responseData.data.user) {
    //     const dataResIngo = Object.entries(responseData.data.user);
    //     return dataResIngo;
    //     console.log("dataResIngo", dataResIngo);
    // } else {
    //     console.log("dataResIngo error");
    // }
    return (
        <>
            <Modal title={typeId === 1 ? "LOST THING" : "FOUND THING"} visible={openModal} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
                <p style={{ fontSize: "23px" }}>{modalText}</p>
                {/* Display the response data in the modal */}
                {responseData && responseData.data && responseData.data.user && responseData.data.token && (
                    <div>
                        <h3>Response Data: </h3>
                        <ul>
                            {Object.keys(responseData.data.user).map((key) => (
                                <li>
                                    {key} : {responseData.data.user[key]}
                                </li>
                            ))}
                        </ul>
                        <div>
                            <strong>token: </strong> {responseData.data.token}
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};
