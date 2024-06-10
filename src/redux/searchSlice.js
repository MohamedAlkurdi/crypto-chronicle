import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const search = createAsyncThunk("search", async (query)=>{
    const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
    return response.data;
})


const initialState = {
    searchInput :"",
    searching:false,
    Match:false,
    output:[],
}

const searchSlice = createSlice({
    name:"searchSlice",
    initialState,
    reducers:{
        updateSearchInput:(state,action)=>{
            state.searchInput = action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(search.pending, (state,action)=>{
            state.searching = true;
        });
        builder.addCase(search.fulfilled,(state,action)=>{
            state.searching = false;
            state.Match = true;
        });
        builder.addCase(search.rejected,(state,action)=>{
            state.searching = false;
        });
    }
})