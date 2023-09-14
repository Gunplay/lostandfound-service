import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setAdataPhotos } from "../../redux/form/slice";

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const UpLoadImage: React.FC = () => {
    const dispatch = useDispatch();
    const photos = useSelector((store: RootState) => store.form.adData.photos);
    console.log("photos", photos);

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

    //const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

    // const handleChange = (e) => {
    //     const LoadPhoto = e.file as UploadFile[];
    //     dispatch(setAdataPhotos(LoadPhoto));
    //     // console.log(e.file.name);
    //     // console.log(e.event);
    // };

    const handleChange: UploadProps["onChange"] = ({ fileList }: { fileList: UploadFile<any>[] }) => {
        dispatch(setAdataPhotos(fileList)); // Use your action creator to update photos
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-circle"
                fileList={photos as UploadFile[]}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {photos.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </>
    );
};
