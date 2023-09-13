import type { UploadFile } from "antd/es/upload/interface";
export interface FormData {
    adData: {
        _id: string;
        title: string;
        description: string;
        photos: UploadFile[];
        typeId: string;
        categories: string;
        // location: {
        //     _id: null,
        //     address: null,
        //     lat: null,
        //     lng: null,
        // },
        user: User;
        categoryId: string;
        lostOrFoundAt: string;
        // createdAt: string;
        // secretQuestion: string;
    };
}

interface User {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
}

export enum Status {
    LOADING = "loading",
    SUCCESS = "completed",
    ERROR = "error",
}
