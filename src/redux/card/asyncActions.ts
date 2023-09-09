import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CardData } from "./types";
// import pickBy from 'lodash/pickBy';
// import identity from 'lodash/identity';

export const fetchCards = createAsyncThunk<CardData[]>("card/fetchCards", async () => {
    // (params)
    //const { sortBy, order, category, search, currentPage } = params;
    //console.log(params, 4444);
    const { data } = await axios.get<CardData[]>(`http://localhost:3001/ads/new`, {
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
    console.log("data", data);
    return data;
});
