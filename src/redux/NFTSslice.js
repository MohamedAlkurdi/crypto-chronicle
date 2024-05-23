import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loadedNFTS: []
};

const NFTSslice = createSlice({
    name: "NFTSslice",
    initialState,
    reducers: {
        addLoadedNFT: (state, action) => {
            const set = new Set(state.loadedNFTS);
            set.add(action.payload);
            state.loadedNFTS = Array.from(set);
            state.loadedNFTS.len
        }
    }
});

export const { addLoadedNFT } = NFTSslice.actions;
export default NFTSslice.reducer;
