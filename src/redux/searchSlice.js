import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const search = createAsyncThunk("search", async (query)=>{
    const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
    return response.data;
})


const initialState = {
    searching:false,
    match:false,
    error:false,
    output:{
        coins:[],
        nfts:[],
        exchanges:[],
    },
}

const searchSlice = createSlice({
    name:"searchSlice",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(search.pending, (state)=>{
            state.searching = true;
        });
        builder.addCase(search.fulfilled,(state,action)=>{
            state.searching = false;
            const {coins, nfts, exchanges} = action.payload;
            state.output.coins = coins;
            state.output.nfts = nfts;
            state.output.exchanges = exchanges;
            const lengths = [coins.length,nfts.length,exchanges.length]
            const isEmpty = lengths.some(el => el > 0)
            state.match = isEmpty;
        });
        builder.addCase(search.rejected,(state)=>{
            state.searching = false;
            state.error =true;
        });
    }
})

export default searchSlice.reducer;