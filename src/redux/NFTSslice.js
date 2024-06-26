import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { enableMapSet } from 'immer';
import { randomSetOfNumbers } from "../modules/calculations";
import { getRandomNumberInRange } from "../modules/calculations";

enableMapSet()

export const loadMoreNFTS = createAsyncThunk("getMoreNftsData", async () => {
    const response = await axios.get('https://api.coingecko.com/api/v3/nfts/list');
    return response.data;
});

const initialState = {
    loadedNFTS: [],
    loadingMoreNfts: false,
    successfullyLoaded:false,
    neededNfts: [],
    staticNFTS: ["squiggly", "voxelglyph", "autoglyphs"]
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
        setLoading: (state, action) => {
            state.loadingMoreNfts = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadMoreNFTS.pending, (state) => {
            state.loadingMoreNfts = true
        });
        builder.addCase(loadMoreNFTS.fulfilled, (state, action) => {
            // state.loadingMoreNfts = false
            state.successfullyLoaded = true
            const data = action.payload;
            const randomIndices = randomSetOfNumbers(data.length);
            const randNfts = [];
            const newId = data[getRandomNumberInRange(0,data.length)].id;
            const existsInLocally = randNfts.some(el => (el.id === newId))
            const existsGlobally = state.neededNfts.some(el => (el.id === newId))
            while (randNfts.length < 3) { 
                if (!existsInLocally || !existsGlobally) {
                    randNfts.push(newId);
                }
            }
            randomIndices.forEach((index) => {
                randNfts.push(data[index].id);
            });
            state.neededNfts = [...new Set([...state.neededNfts, ...randNfts])];
        });
        builder.addCase(loadMoreNFTS.rejected, (state) => {
            // state.failedLoadingNfts = true;
            state.loadingMoreNfts = false;
            state.successfullyLoaded = false
            // state.NFTSloadingError = true;
        });
    }
});

export const { addLoadedNFT, setLoading } = NFTSslice.actions;
export default NFTSslice.reducer;
