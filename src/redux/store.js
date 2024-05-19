import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./API/apiSlice";
import generalData from "./generalData";

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        generalData,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store;