import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { enableMapSet } from 'immer';
import { randomSetOfNumbers } from "../modules/calculations";

enableMapSet();

// 1 call
export const loadMoreCoins = createAsyncThunk("getMoreCoinsData", async () => {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    return response.data;
});

const initialState = {
    vs_currency: 'usd',
    neededCoins: ["bitcoin", "ethereum", "0x", "ilcoin", "illuvium"],
    loadingMoreCoins: false,
    failedLoadingCoins: false,
};

const generalData = createSlice({
    name: "generalSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadMoreCoins.pending, (state) => {
            state.loadingMoreCoins = true;
        });
        builder.addCase(loadMoreCoins.fulfilled, (state, action) => {
            const data = action.payload;
            const randomIndices = randomSetOfNumbers(data.length);
            const randCoins = [];
            
            randomIndices.forEach((index) => {
                randCoins.push(data[index].id);
            });
            state.neededCoins = [...new Set([...state.neededCoins, ...randCoins])];
            state.loadingMoreCoins = false;
        });
        builder.addCase(loadMoreCoins.rejected, (state) => {
            state.failedLoadingCoins = true;
            state.loadingMoreCoins = false;
            console.log("failed loading more data.");
        });
    }
});

export default generalData.reducer;