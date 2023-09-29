import { CreateSliceOptions, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormData, Status, FormResetData } from "./types";
import { fetchFormCategories } from "./asyncActions";
import type { UploadFile } from "antd/es/upload/interface";

const initialState: FormData = {
    adData: {
        _id: "",
        title: "",
        description: "",
        photosData: [],
        ///dateLostOrFound: "",
        typeId: "",
        categories: "",
        location: {
            _id: "",
            address: "Default",
            lat: "333",
            lng: "777",
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
        categoryId: "",
        lostOrFoundAt: "",
        checked: false,
        createdAt: "",
        secretQuestion: "",
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
        setAdataCategories(state, action: PayloadAction<string>) {
            state.adData.categories = action.payload;
        },
        setAdataDescription(state, action: PayloadAction<string>) {
            state.adData.description = action.payload;
        },
        //PayloadAction<Record<string, string>[]>
        setAdataPhotos(state, action: PayloadAction<UploadFile[]>) {
            //state.adData.photos = [...state.adData.photos, ...action.payload];
            //state.adData.photos = JSON.stringify(action.payload);
            //tate.adData.photos.push(action.payload);
            var tempProps = Object.create(action.payload); // create copy - without link

            console.log("tempProps", tempProps);
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
    setClearFormData,
    setAdataTitle,
    setAdataCategories,

    setAdataPhotos,
    setAdataLocation,
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
