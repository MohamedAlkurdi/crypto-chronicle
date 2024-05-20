import { createSlice } from "@reduxjs/toolkit";

const initialState = {
chartTimeSlice: '30',
chartDetails: '10',
}
const chartSlice = createSlice({
name:"chartSlice",
initialState,
reducers:{
    setTimeSlice: (state, action) => {
        const newTimeSlice = action.payload;
        state.chartTimeSlice = newTimeSlice;
    },
    setDetails: (state, action) => {
        const isDetiled = action.payload;
        if(isDetiled){
            state.chartDetails='20'
        }else{
            state.chartDetails= '10'
        }
    }
}
})

export const {setTimeSlice,setDetails} = chartSlice.actions;
export default chartSlice.reducer;