import { useEffect, useState } from "react";
import { useCoinSummaryQuery } from "../redux/API/apiSlice"
import { useSelector } from "react-redux";

export default function CoinInfo({id}){
    const {vs_currency} = useSelector(state=>state.generalData);

    const [state,setState] = useState({
        [vs_currency]:"loading...",
        usd_market_cap:"loading...",
        usd_24h_vol:"loading...",
        usd_24h_change:"loading...",
        last_updated_at:"loading...",
    })

    // const coinSummary = useCoinSummaryQuery(id);
    // useEffect(()=>{
    //     if(coinSummary.isError){
    //         setState({[vs_currency]:"Failed.",
    //         usd_market_cap:"Failed.",
    //         usd_24h_vol:"Failed.",
    //         usd_24h_change:"Failed.",
    //         last_updated_at:"Failed.",})
    //     }
    //     if(coinSummary.isLoading){
    //         setState({[vs_currency]:"Loading...",
    //         usd_market_cap:"Loading...",
    //         usd_24h_vol:"Loading...",
    //         usd_24h_change:"Loading...",
    //         last_updated_at:"Loading...",})
    //     }
    //     else if(coinSummary.isSuccess){
    //         setState({...coinSummary.data[`${id}`]})
    //     }
    // },[coinSummary])

    return(
        <div className="coinInfo">
            <hr className="h-[2px] w-full bg-black" />
            <div className="row  flex justify-between items-center ">
            <div className="w-full p-5 text-lg text-main ">{id}</div>
            <div className="w-full p-5 text-lg text-main ">{state.usd}</div>
            <div className="w-full p-5 text-lg text-main ">{state.usd_market_cap}</div>
            <div className="w-full p-5 text-lg text-main ">{state.usd_24h_vol}</div>
            <div className="w-full p-5 text-lg text-main ">{state.usd_24h_change}</div>
            <div className="w-full p-5 text-lg text-main ">{state.last_updated_at}</div>
            </div>
        </div>
    )
}