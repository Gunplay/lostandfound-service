import { useSelector } from "react-redux";
import * as yup from "yup";
import { RootState } from "../../redux/store";
import { AD_LOST_TYPE_ID, AD_FOUND_TYPE_ID } from "./ChooseTypeAd";

export const firstStepSchemaLost = yup.object().shape({
    title: yup.string().min(5, "Title must be at least 5 characters").max(50, "Title cannot exceed 50 characters").required("Please, input the name of your Lost or Found Thing"),
    category: yup.string().required("Choose some type options"),
});

export const yupSyncStepFirstLost = {
    async validator({ field }: any, value: any) {
        await firstStepSchemaLost.validateSyncAt(field, { [field]: value });
    },
};
export const firstStepSchemaFound = yup.object().shape({
    title: yup.string().min(5, "Title must be at least 5 characters").max(50, "Title cannot exceed 50 characters").required("Please, input the name of your Lost or Found Thing"),
    category: yup.string().required("Choose some type options"),
    secretquestion: yup.string().required("Secret Question is required for Found type"),
    secretanswer: yup.string().required("Secret Answer is required for Found type"),
});

export const yupSyncStepFirstFound = {
    async validator({ field }: any, value: any) {
        await firstStepSchemaFound.validateSyncAt(field, { [field]: value });
    },
};
// const validatePhotos = async (photosData: any) => {
//     if (photosData.length >= 2) {
//         // Исправлено условие здесь
//         throw new yup.ValidationError("You should upload exactly 5 photos.", undefined, "photos");
//     }
//};

export const secondStepSchema = yup.object().shape({
    description: yup
        .string()
        .min(5, "Description must be at least 5 characters")
        .max(200, "Description cannot exceed 200 characters")
        .required("Please, you should write your Description. Try to write very detailed"),
    // photos: yup.array().test({
    //     name: "photos",
    //     message: "Please upload at least 3 photos",
    //     test: (value: any) => {
    //         // Here, you can access the photosData array and perform custom validation
    //         return value.length >= 3;
    //     },
    // }),
    // photos: yup.array().min(3, "Please upload at least 3 photos").required("Please upload at least 3 photos"),
    date: yup.string().required("Please, you should choose a date."),
});

// Добавьте функцию валидации с использованием context
export const yupSyncStepSecond = {
    async validator({ field }: any, value: any) {
        await secondStepSchema.validateSyncAt(field, { [field]: value });
    },
};

export const thirdStepSchema = yup.object().shape({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    phone: yup
        .string()
        .required("Phone Number is required")
        .matches(/^[+]?\d*$/, "Please enter a valid phone number"),
    email: yup.string().required("E-mail is required").email("Please enter a valid email address"),
    agreement: yup.boolean().oneOf([true], "You must accept the agreement"),
});

export const yupSyncStepThirdStepSchema = {
    async validator({ field }: any, value: any) {
        await thirdStepSchema.validateSyncAt(field, { [field]: value });
    },
};
