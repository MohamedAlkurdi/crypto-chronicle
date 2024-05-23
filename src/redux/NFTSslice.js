import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loadedNFTS:[
        
    ]
}

const NFTSslice = createSlice({
    name:"NFTSslice",
    initialState,
    reducers:{
        addLoadedNFT:(state,action)=>{
            state.loadedNFTS.push(action.payload);
        }
    }
})

export const {addLoadedNFT} = NFTSslice.actions;
export default NFTSslice.reducer;
