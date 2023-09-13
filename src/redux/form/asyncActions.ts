import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// import pickBy from 'lodash/pickBy';
// import identity from 'lodash/identity';

export const fetchFormCategories = createAsyncThunk<FormData[]>("form/fetchFormCategories", async () => {
    // (params)
    //const { sortBy, order, category, search, currentPage } = params;
    //console.log(params, 4444);
    const { data } = await axios.get<FormData[]>(`http://localhost:3001/ads/categories`, {
        //   params: pickBy(
        //     {
        //       page: currentPage,
        //       limit: 4,
        //       category,
        //       sortBy,
        //       order,
        //       search,
        //     },
        //     identity,
        //   ),
    });
    console.log("categories", data);
    return data;
});
