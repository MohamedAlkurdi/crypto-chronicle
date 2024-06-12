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
    global_429_error:false,
    global_440_error:false,
};

const generalData = createSlice({
    name: "generalSlice",
    initialState,
    reducers: {
        handle_global_429_error:(state,action)=>{
            state.global_429_error = action.payload;
            console.log("global_429_error state updated",action.payload);
        },
        handle_global_404_error:(state,action)=>{
            state.global_404_error = action.payload;
            console.log("global_404_error state updated",action.payload);
        }
    },
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
            state.global_429_error = true;
            console.log("failed loading more data.");
        });
    }
});

export const { setTimeSlice,handle_global_429_error,handle_global_404_error } = generalData.actions;
export default generalData.reducer;