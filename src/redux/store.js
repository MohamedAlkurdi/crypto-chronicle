import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./API/apiSlice";
import generalData from "./generalData";
import favSlice from "./favSlice";

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        generalData,
        favSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store;