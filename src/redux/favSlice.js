import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coins:[],
    nfts:[],
}

const favSlice = createSlice({
    name:"favSlice",
    initialState,
    reducers:{
        addFavCoin: (state,action)=>{
            const favItem = action.payload;
            if(!state.coins.includes(favItem)){
                state.coins.push(favItem)
            }
        },
        addFavNft:(state,action)=>{
            const favItem = action.payload;
            if(!state.nfts.includes(favItem)){
                state.nfts.push(favItem);
            }
        }
    }
})

export const {addFavCoin,addFavNft} = favSlice.actions;
export default favSlice.reducer;