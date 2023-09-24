import { configureStore } from "@reduxjs/toolkit";
// import filter from './filter/slice';
// import cart from './cart/slice';
// import pizza from './pizza/slice';
import { useDispatch } from "react-redux";

import cardReducer from "./card/slice";
import formReducer from "./form/slice";

// import formCategoriesReducers from "./form/slice";

export const store = configureStore({
    reducer: {
        card: cardReducer,
        form: formReducer,

        // categories: formCategoriesReducers,

        // cart,
        // pizza,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these paths in the state
                ignoredActions: ["form/setAdataPhotos", "form/setAdataDataLostOrFound"],
                ignoredPaths: ["form.adData.photos", "form.adData.lostOrFoundAt"],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
