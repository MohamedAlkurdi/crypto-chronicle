import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./API/apiSlice";
import generalData from "./generalData";
import favSlice from "./favSlice";
import chartSlice from "./chartSlice";
import NFTSslice from "./NFTSslice";
import exchangesSlice from './exchangesSlice'

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        generalData,
        favSlice,
        chartSlice,
        NFTSslice,
        exchangesSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store;