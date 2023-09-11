// import { CreateSliceOptions, PayloadAction, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     adData: {
//         _id: null,
//         title: null,
//         description: null,
//         photos: [],
//         typeId: null,
//         location: {
//             _id: null,
//             address: null,
//             lat: null,
//             lng: null,
//         },
//         user: {
//             firstname: null,
//             lastname: null,
//             email: null,
//             phone: null,
//         },
//         categoryId: null,
//         lostOrFoundAt: null,
//         createdAt: null,
//         secretQuestion: null,
//     },
// };
// const formSlice = createSlice({
//     name: "form", // type and payload
//     initialState,
//     reducers: {
//         // actions
//         setItems(state, action) {
//             // card/setItems
//             state.adData = action.payload;
//         },
//     },
//     // extraReducers: (builder) => {
//     //     builder.addCase(fetchCards.pending, (state, action) => {
//     //         state.status = Status.LOADING;
//     //         state.items = [];
//     //     });

//     //     builder.addCase(fetchCards.fulfilled, (state, action) => {
//     //         state.items = action.payload;
//     //         state.status = Status.SUCCESS;
//     //     });

//     //     builder.addCase(fetchCards.rejected, (state, action) => {
//     //         state.status = Status.ERROR;
//     //         state.items = [];
//     //     });
//     // },
// });

// export const { setItems } = formSlice.actions;

// export default formSlice.reducer; // pass to store
