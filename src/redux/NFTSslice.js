import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { enableMapSet } from 'immer';
import { randomSetOfNumbers } from "../modules/calculations";

enableMapSet()

export const loadMoreNFTS = createAsyncThunk("getMoreNftsData", async () => {
    const response = await axios.get('https://api.coingecko.com/api/v3/nfts/list');
    return response.data;
});

const initialState = {
    loadedNFTS: [],
    loadingMoreNfts:false,
    neededNfts: [],
    NFTSloadingError:false,
};

const NFTSslice = createSlice({
    name: "NFTSslice",
    initialState,
    reducers: {
        addLoadedNFT: (state, action) => {
            const nftExists = state.loadedNFTS.find(nft => nft.id === action.payload.id);
            if (!nftExists) {
                state.loadedNFTS.push(action.payload);
            }
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(loadMoreNFTS.pending, (state)=>{
            state.loadingMoreNfts = true
        });
        builder.addCase(loadMoreNFTS.fulfilled, (state, action) => {
            const data = action.payload;
            const randomIndices = randomSetOfNumbers(data.length);
            const randNfts = [];

            randomIndices.forEach((index) => {
                randNfts.push(data[index].id);
            });
            state.neededNfts = [...new Set([...state.neededNfts, ...randNfts])];
            state.loadingMoreNfts = false;
        });
        builder.addCase(loadMoreNFTS.rejected, (state,action) => {
            state.failedLoadingNfts = true;
            state.loadingMoreNfts = false;
            state.NFTSloadingError = true;
            console.log("is error =====>:",action.error.code)
            // if(action.error.code === 'ERR_BAD_REQUEST'){
            // }
            console.log("failed loading more data.");
        });
    }
});

export const { addLoadedNFT } = NFTSslice.actions;
export default NFTSslice.reducer;
