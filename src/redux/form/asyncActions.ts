import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserIdCategory } from "./types";
// Remove the import of useDispatch from this file

export const fetchFormCategories = createAsyncThunk<UserIdCategory[]>("form/fetchFormCategories", async () => {
    try {
        const { data } = await axios.get<UserIdCategory[]>(`http://127.0.0.1:3001/ads/categories`);
        // Dispatch actions here if needed
        // dispatch(setAdsCategories(transformedCategories));
        return data;
    } catch (error) {
        // Handle errors here if necessary
        throw error;
    }
});
