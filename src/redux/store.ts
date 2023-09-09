import { configureStore } from "@reduxjs/toolkit";
// import filter from './filter/slice';
// import cart from './cart/slice';
// import pizza from './pizza/slice';
import { useDispatch } from "react-redux";

import cardReducer from "./card/slice";

export const store = configureStore({
    reducer: {
        card: cardReducer,
        // filter,
        // cart,
        // pizza,
    },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
