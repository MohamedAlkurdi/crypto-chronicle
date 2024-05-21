import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTimeSlice } from "../redux/chartSlice";
import { setDetails } from "../redux/chartSlice";
import {setChartError} from "../redux/chartSlice"

export default function TimeSliceOptions() {
    const chartTimeSlice = useSelector(state=>state.chartSlice.chartTimeSlice);
    const chartError = useSelector(state=>state.chartSlice.chartError);
    const dispatch = useDispatch();
    const [customTime, setCustomTime] = useState("");
    const [detailed,setDetailed] = useState(false);

    function handlechartDetails(){
        setDetailed(state=>!state);
    }
    useEffect(()=>{
        dispatch(setDetails(detailed))
    },[detailed])

    const handleTimeSelection = (time) => {
        dispatch(setTimeSlice(time));
    };

    const handleCustomTimeChange = (e) => {
        setCustomTime(e.target.value);
    };

    const handleCustomTimeSubmit = () => {
        const time = parseInt(customTime);
        if (!isNaN(time) && time > 0 && time < 365) {
            dispatch(setTimeSlice(customTime));
            dispatch(setChartError(false));
        }else{
            dispatch(setChartError(true));
        }
    };

    const timeSlices = ['1', '30', '90', '270', '365'];

    return (
        <div className="flex items-center justify-between px-16 py-8">
            <div className="flex gap-4">
                {timeSlices.map((time) => (
                    <button
                        key={time}
                        onClick={() => handleTimeSelection(time)}
                        className={` ${chartTimeSlice === time? 'bg-lightMain' : 'bg-main' } p-2 text-secondary rounded-md hover:bg-lightMain`}
                    >
                        {time} day{time !== '1' && 's'}
                    </button>
                ))}
            </div>
            <button 
            onClick={handlechartDetails}
            className={`${detailed ? 'bg-lightMain' : 'bg-main'} text-secondary rounded-md p-2`}
            >
                More Details
            </button>
            <div className="flex gap-4">
                <input
                    type="text"
                    value={customTime}
                    onChange={handleCustomTimeChange}
                    placeholder="Enter custom time"
                    className={`p-2 border ${chartError? 'border-red-500' : 'border-main'}  text-main rounded-md focus:outline-none`}
                />
                <button
                    onClick={handleCustomTimeSubmit}
                    className="p-2 bg-main text-secondary rounded-md hover:bg-lightMain"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
