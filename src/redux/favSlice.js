import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coins: [],
    nfts: [],
}

const favSlice = createSlice({
    name: "favSlice",
    initialState,
    reducers: {
        addFavCoin: (state, action) => {
            const favItem = action.payload;
            const allreadyExist = state.coins.some(el => el === favItem);
            if (!allreadyExist) {
                state.coins.push(favItem);
            } else {
                state.coins = state.coins.filter((el) => el !== favItem);
            }
        },
        addFavNft: (state, action) => {
            const favItem = action.payload;
            const allreadyExist = state.nfts.some(el => el.id === favItem.id);
            if (!allreadyExist) {
                state.nfts.push(favItem);
            } else {
                state.nfts = state.nfts.filter((el) => el.id !== favItem.id);
            }
        },
    },
});

export const { addFavCoin, addFavNft } = favSlice.actions;
export default favSlice.reducer;
