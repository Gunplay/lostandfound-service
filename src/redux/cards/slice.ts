import { CreateSliceOptions, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CardData, CardSliceState, Status } from "./types";
import { fetchCards } from "./asyncActions";
import type { UploadFile } from "antd/es/upload/interface";
const initialState: CardSliceState = {
    items: [],
    status: Status.LOADING,
};

const cardSlice = createSlice({
    name: "card", // type and payload
    initialState,
    reducers: {
        // actions
        setItems(state, action: PayloadAction<CardData[]>) {
            // card/setItems
            // state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCards.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });

        builder.addCase(fetchCards.fulfilled, (state, action: PayloadAction<CardData[]>) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchCards.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
});

export const { setItems } = cardSlice.actions;

export default cardSlice.reducer; // pass to store
