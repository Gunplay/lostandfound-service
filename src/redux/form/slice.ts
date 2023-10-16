import { CreateSliceOptions, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormData, Status, UserIdCategory } from "./types";
import { fetchFormCategories } from "./asyncActions";
import type { UploadFile } from "antd/es/upload/interface";
//const { ObjectId } = require("mongodb");

const initialState: FormData = {
    adData: {
        _id: "",
        title: "",
        description: "",
        photosData: [],
        ///dateLostOrFound: "",
        typeId: 1,
        categories: [],
        categoryId: "",
        location: {
            // !!!
            address: "Default",
            lat: "46.6349450987773",
            lng: "2.8480490000000103",
        },
        user: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            phonePrefix: "",
            phoneMain: "",
        },
        switcherLostOrFound: "LOST",
        lostOrFoundAt: "",
        checked: false,
        createdAt: "",
        secretQuestion: "",
        secretAnswer: "",
        status: Status.LOADING,
    },
};

const formSlice = createSlice({
    name: "form", // type and payload
    initialState,
    reducers: {
        setClearFormData: (state, action) => {
            state.adData = initialState.adData;
        },
        setAdataTitle(state, action: PayloadAction<string>) {
            state.adData.title = action.payload;
        },
        setAdataCategories(state, action: PayloadAction<UserIdCategory[]>) {
            state.adData.categories = action.payload;
        },
        setAdataCategoryId(state, action: PayloadAction<string>) {
            state.adData.categoryId = action.payload;
        },
        setAdataDescription(state, action: PayloadAction<string>) {
            state.adData.description = action.payload;
        },
        //PayloadAction<Record<string, string>[]>
        setAdataPhotos(state, action: PayloadAction<UploadFile[]>) {
            //state.adData.photos = [...state.adData.photos, ...action.payload];
            //state.adData.photos = JSON.stringify(action.payload);
            //tate.adData.photos.push(action.payload);
            //  state.adData.photosData = [...action.payload];
            var tempProps = Object.create(action.payload); // create copy - without link

            // console.log("tempProps", tempProps);
            state.adData.photosData = tempProps; // new Array
        },
        setAdataLocation(state, action: PayloadAction<string>) {
            state.adData.location.address = action.payload;
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

        setAdataSwitcherLostOrFound(state, action: PayloadAction<number>) {
            state.adData.typeId = action.payload;
        },
        setAdataSwitcherLostOrFoundText(state, action: PayloadAction<string>) {
            state.adData.switcherLostOrFound = action.payload;
        },
        setAdataSecretAnswer(state, action: PayloadAction<string>) {
            state.adData.secretAnswer = action.payload;
        },
        setAdataSecretQuestion(state, action: PayloadAction<string>) {
            state.adData.secretQuestion = action.payload;
        },
        // setAdsCategories(state, action: PayloadAction<string>) {
        //     state.adData.categoryId = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFormCategories.pending, (state, action) => {
            state.adData.status = Status.LOADING;
            state.adData.categories = [];
        });

        builder.addCase(fetchFormCategories.fulfilled, (state, action) => {
            state.adData.status = Status.SUCCESS;
            state.adData.categories = action.payload;
        });

        builder.addCase(fetchFormCategories.rejected, (state, action) => {
            state.adData.status = Status.ERROR;
            state.adData.categories = [];
        });
    },
});

export const {
    setClearFormData,
    setAdataTitle,
    setAdataCategories,
    setAdataCategoryId,

    setAdataPhotos,
    setAdataLocation,
    setAdataDescription,
    setAdataDataLostOrFound,
    setAdataFirstName,
    setAdataLastName,
    setAdataEmail,
    setAdataPhonePrefix,
    setAdataPhoneMain,

    setAdataSwitcherLostOrFound,
    setAdataSwitcherLostOrFoundText,
    setAdataPhonePrefixUpdate,
    setAdataPhoneMainUpdate,
    setAdataChecked,
    setAdataSecretAnswer,
    setAdataSecretQuestion,
} = formSlice.actions;

export default formSlice.reducer; // pass to store
