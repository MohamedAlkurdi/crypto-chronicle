import { useEffect } from "react";
import { useGetExchangesQuery } from "../redux/API/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { handle_global_429_error } from "../redux/generalData";
import { handleCallsLimitError } from "../modules/errorHandlers";

export default function Exchanges(){
    const {isSuccess, isError, data, error} = useGetExchangesQuery();
    const is_429_error = useSelector(state => state.generalData.global_429_error);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            if(error.status===429){
                dispatch(handle_global_429_error(true))
            }
        }
    }, [isError]);

    useEffect(()=>{
        if(is_429_error){
            handleCallsLimitError();
        }
    },[is_429_error])

}