import { CreateSliceOptions, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormData, Status } from "./types";
import { fetchFormCategories } from "./asyncActions";

const initialState: FormData = {
    adData: {
        _id: "",
        title: "",
        description: "",
        photos: [],
        typeId: "",
        categories: "",
        // location: {
        //     _id: null,
        //     address: null,
        //     lat: null,
        //     lng: null,
        // },
        user: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
        },
        categoryId: "",
        lostOrFoundAt: "LOST",
        // createdAt: null,
        // secretQuestion: null,
    },
};

const formSlice = createSlice({
    name: "form", // type and payload
    initialState,
    reducers: {
        // actions
        setAdataTitle(state, action: PayloadAction<string>) {
            // card/setItems
            state.adData.title = action.payload;
        },
        setAdataDescription(state, action: PayloadAction<string>) {
            // card/setItems
            state.adData.description = action.payload;
        },
        setAdataPhoto(state, action: PayloadAction<string>) {
            // card/setItems
            state.adData.photos = action.payload;
        },
        setAdataTypeId(state, action: PayloadAction<string>) {
            // card/setItems
            state.adData.typeId = action.payload;
        },
        setAdataCategories(state, action: PayloadAction<string>) {
            // card/setItems
            state.adData.categories = action.payload;
        },
        setAdataLostOrFoundAt(state, action: PayloadAction<string>) {
            // card/setItems
            state.adData.lostOrFoundAt = action.payload;
        },
        // setAdataPhoto(state, action: PayloadAction<string>) {
        //     // card/setItems
        //     state.adData.form = action.payload;
        // },
        // setAdataPhoto(state, action: PayloadAction<string>) {
        //     // card/setItems
        //     state.adData.form = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFormCategories.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });

        builder.addCase(fetchFormCategories.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchFormCategories.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
});

export const { setAdataTitle, setAdataCategories, setAdataLostOrFoundAt, setAdataPhoto } = formSlice.actions;

export default formSlice.reducer; // pass to store
