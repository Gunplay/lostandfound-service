import * as yup from "yup";

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

export const secondStepSchema = yup.object().shape({
    description: yup
        .string()
        .min(5, "Description must be at least 5 characters")
        .max(200, "Description cannot exceed 200 characters")
        .required("Please, you should write your Description. Try to write very detailed"),
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
    prefix: yup.string().required("Prefix is required"),
    phone: yup.string().required("Phone Number is required"),
    email: yup.string().required("E-mail is required").email("Please enter a valid email address"),
    agreement: yup.boolean().oneOf([true], "You must accept the agreement"),
});

export const yupSyncStepThirdStepSchema = {
    async validator({ field }: any, value: any) {
        await thirdStepSchema.validateSyncAt(field, { [field]: value });
    },
};
