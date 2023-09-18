import { CreateSliceOptions, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormData, Status } from "./types";
import { fetchFormCategories } from "./asyncActions";
import type { UploadFile } from "antd/es/upload/interface";

// interface PhotoInfo {
//     uid: string;
//     name: string;
//     thumbUrl?: string; // thumbUrl является необязательным полем
// }

const initialState: FormData = {
    adData: {
        _id: "",
        title: "",
        description: "",
        photos: [],
        ///dateLostOrFound: "",
        typeId: "",
        categories: "",
        location: {
            _id: "",
            address: "",
            lat: "",
            lng: "",
        },
        user: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            phonePrefix: "",
            phoneMain: "",
        },
        switcherLostOrFound: "",
        categoryId: "",
        lostOrFoundAt: "Choose the time",
        checked: false,
        createdAt: "",
        secretQuestion: "",
    },
};

const formSlice = createSlice({
    name: "form", // type and payload
    initialState,
    reducers: {
        setAdataTitle(state, action: PayloadAction<string>) {
            state.adData.title = action.payload;
        },
        setAdataCategories(state, action: PayloadAction<string>) {
            state.adData.categories = action.payload;
        },
        setAdataDescription(state, action: PayloadAction<string>) {
            state.adData.description = action.payload;
        },

        setAdataPhotos(state, action: PayloadAction<Record<string, string>[]>) {
            console.log("fileList", action.payload);
            state.adData.photos = [...state.adData.photos, ...action.payload];
        },

        setAdataDataLostOrFound(state, action: PayloadAction<string>) {
            state.adData.lostOrFoundAt = action.payload;
        },

        setAdataFirstName(state, action: PayloadAction<string>) {
            state.adData.user.firstname = action.payload;
        },
        setAdataLastName(state, action: PayloadAction<string>) {
            state.adData.user.lastname = action.payload;
        },
        setAdataEmail(state, action: PayloadAction<string>) {
            state.adData.user.email = action.payload;
        },

        setAdataPhonePrefix(state, action: PayloadAction<string>) {
            state.adData.user.phonePrefix = action.payload;
        },
        setAdataPhoneMain(state, action: PayloadAction<string>) {
            state.adData.user.phoneMain = action.payload;
        },
        setAdataPhonePrefixUpdate(state, action: PayloadAction<string>) {
            state.adData.user.phonePrefix = action.payload;
            state.adData.user.phone = state.adData.user.phoneMain + action.payload;
        },
        setAdataPhoneMainUpdate(state, action: PayloadAction<string>) {
            state.adData.user.phoneMain = action.payload;
            state.adData.user.phone = state.adData.user.phonePrefix + action.payload;
        },

        setAdataChecked(state, action: PayloadAction<boolean>) {
            state.adData.checked = action.payload;
        },
        // setAdataTypeId(state, action: PayloadAction<string>) {
        //     // card/setItems
        //     state.adData.typeId = action.payload;
        // },

        setAdataSwitcherLostOrFoundt(state, action: PayloadAction<string>) {
            // card/setItems
            state.adData.switcherLostOrFound = action.payload;
        },
        setAdataCreatedAt(state, action: PayloadAction<string>) {
            // card/setItems
            state.adData.createdAt = action.payload;
        },
        setAdataSecretQuestion(state, action: PayloadAction<string>) {
            // card/setItems
            state.adData.secretQuestion = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchFormCategories.pending, (state, action) => {
    //         state.status = Status.LOADING;
    //         state.items = [];
    //     });

    //     builder.addCase(fetchFormCategories.fulfilled, (state, action) => {
    //         state.items = action.payload;
    //         state.status = Status.SUCCESS;
    //     });

    //     builder.addCase(fetchFormCategories.rejected, (state, action) => {
    //         state.status = Status.ERROR;
    //         state.items = [];
    //     });
    // },
});

export const {
    setAdataTitle,
    setAdataCategories,

    setAdataPhotos,
    setAdataDescription,
    setAdataDataLostOrFound,
    setAdataFirstName,
    setAdataLastName,
    setAdataEmail,
    setAdataPhonePrefix,
    setAdataPhoneMain,

    setAdataSwitcherLostOrFoundt,
    setAdataPhonePrefixUpdate,
    setAdataPhoneMainUpdate,
    setAdataChecked,
    setAdataCreatedAt,
    setAdataSecretQuestion,
} = formSlice.actions;

export default formSlice.reducer; // pass to store
