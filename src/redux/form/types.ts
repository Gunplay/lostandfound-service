import type { UploadFile } from "antd/es/upload/interface";
import type { DatePickerProps } from "antd";
import type { Dayjs } from "dayjs";

// import { type } from "os";
export interface FormData {
    adData: {
        _id: string;
        title: string;
        description: string;
        photosData: UploadFile[];
        // dateLostOrFound: string;
        typeId: string;
        categories: string;
        location: Location;
        user: User;
        switcherLostOrFound: string;
        categoryId: string;
        lostOrFoundAt: string;
        checked: boolean;
        createdAt: string;
        secretQuestion: string;
    };
}

interface Location {
    _id: string;
    address: string;
    lat: string;
    lng: string;
}

interface User {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    phonePrefix: string;
    phoneMain: string;
}

export enum Status {
    LOADING = "loading",
    SUCCESS = "completed",
    ERROR = "error",
}

export interface FormResetData {
    _id: string;
    title: string;
    description: string;
    photosData: any[]; // Здесь замените any на более конкретный тип, если это возможно
    location: {
        address: string;
        lat: number;
        lng: number;
    };
    user: {
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
    };
    categoryId: string;
    lostOrFoundAt: string;
    createdAt: string;
    secretQuestion: string;
}
