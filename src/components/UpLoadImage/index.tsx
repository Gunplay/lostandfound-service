import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { UploadChangeParam } from "antd/es/upload/interface";
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

    //const handleChange: UploadProps["onChange"] = ({ fileList }: CustomUploadChangeParam) => dispatch(setAdataPhotos(newFileList));

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    // const [fileList, setFileList] = useState<UploadFile[]>([
    //     {
    //         uid: "-1",
    //         name: "yyy.png",
    //         status: "done",
    //         url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //         // thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //     },
    // ]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        console.log("file", file);
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    //const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList([...newFileList]);

    const handleChange = (data: any) => {
        console.log("data", data);
        dispatch(
            setAdataPhotos([
                {
                    name: "yyy.1",
                    status: "done",
                    uid: "-11",
                    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                },
            ])
        );
    };

    // useEffect(() => {
    //     const arrayGetBase64: string[] = [];
    //     //@ts-ignore
    //     async function getBaseTh() {
    //         fileList.forEach((file) => {
    //             console.log("fileForEach", file);
    //             //@ts-ignore
    //             // const resultPrev = getBase64(file.originFileObj);
    //             // console.log("resultPrev", resultPrev);
    //             arrayGetBase64.push(file);
    //         });
    //     }
    //     getBaseTh();
    //     //@ts-ignore
    //     dispatch(
    //         setAdataPhotos([
    //             {
    //                 name: "yyy.1",
    //                 status: "done",
    //                 uid: "-11",
    //                 url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //             },
    //         ])
    //     );
    //     console.log("fileList-ussEff", fileList);
    // }, [fileList]);

    return (
        <>
            {/* </><input type="file" id="file" onChange={handleChange} /> */}
            <Upload
                // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                beforeUpload={() => false}
                listType="picture-circle"
                fileList={photos} // create thumbUrl
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {/* {photos.length >= 8 ? null : uploadButton} */}
                {uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </>
    );
};
