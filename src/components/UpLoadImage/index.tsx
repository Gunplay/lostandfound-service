import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { setAdataPhotos } from "../../redux/form/slice";
import { RootState, store } from "../../redux/store";

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const UpLoadImage: React.FC = () => {
    const dispatch = useDispatch();
    const { photosData } = useSelector((store: RootState) => store.form.adData);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
    };

    const handleChange: UploadProps["onChange"] = ({ fileList }: { fileList: UploadFile[] }) => {
        dispatch(setAdataPhotos(fileList));
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const TextUpload = <div>Five photos are maximum</div>;
    return (
        <>
            <Upload
                // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                type="select"
                listType="picture-circle"
                maxCount={5}
                fileList={photosData}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {photosData.length >= 5 ? null : uploadButton}
            </Upload>
            {photosData.length >= 5 ? TextUpload : null}
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </>
    );
};
