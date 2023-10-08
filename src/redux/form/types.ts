import type { UploadFile } from "antd/es/upload/interface";
import type { DatePickerProps } from "antd";
import type { Dayjs } from "dayjs";

// import { type } from "os";
export interface UserIdCategory {
    _id: string;
    category: string;
}
export interface FormData {
    adData: {
        _id: string;
        title: string;
        description: string;
        photosData: UploadFile[];
        // dateLostOrFound: string;
        typeId: number;
        user: User;
        categories: UserIdCategory[];
        categoryId: string;
        location: Location;
        switcherLostOrFound: string;
        lostOrFoundAt: string;
        checked: boolean;
        createdAt: string;
        secretQuestion: string;
        status: string;
    };
}

interface Location {
    //_id: string;
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

// export interface FormResetData {
//     _id: string;
//     title: string;
//     description: string;
//     photosData: any[]; // Здесь замените any на более конкретный тип, если это возможно
//     location: {
//         address: string;
//         lat: number;
//         lng: number;
//     };
//     user: {
//         firstname: string;
//         lastname: string;
//         email: string;
//         phone: string;
//     };
//     categoryId: string;
//     lostOrFoundAt: string;
//     createdAt: string;
//     secretQuestion: string;
// }
