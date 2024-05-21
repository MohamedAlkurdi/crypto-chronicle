import { createSlice } from "@reduxjs/toolkit";

const initialState = {
chartTimeSlice: '30',
chartDetails: '10',
chartError:false,
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
    },
    setChartError:(state,action)=>{
        state.chartError = action.payload;
    }
}
})

export const {setTimeSlice,setDetails,setChartError} = chartSlice.actions;
export default chartSlice.reducer;