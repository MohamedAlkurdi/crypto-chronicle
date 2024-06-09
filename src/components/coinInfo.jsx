import { useEffect, useState } from "react";
import { useCoinSummaryQuery } from "../redux/API/apiSlice"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addFavCoin } from "../redux/favSlice";

export default function CoinInfo({ id }) {
    const { vs_currency } = useSelector(state => state.generalData);
    const dispatch = useDispatch()
    const favCoins = useSelector(state => state.favSlice.coins)
    const [fav,setFav] = useState(false);

    useEffect(()=>{
        if(favCoins.includes(id)){
            setFav(true);
        }else{
            setFav(false);
        }
    },[favCoins])

    function handleFav(e) {
        e.preventDefault();
        dispatch(addFavCoin(id));
    }

    const [state, setState] = useState({
        [vs_currency]: "loading...",
        usd_market_cap: "loading...",
        usd_24h_vol: "loading...",
        usd_24h_change: "loading...",
        last_updated_at: "loading...",
    })

    // the following code is commented to prevent the api call limit problems.

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

    return (
        <NavLink to={`/coin/:${id}`} className="coinInfo  hover:bg-darkMainBg border-t-2 border-t-main">
            <div className="row  flex justify-between items-center ">
                <div className="w-full text-center p-5 text-lg text-main ">{id}</div>
                <div className="w-full text-center p-5 text-lg text-main ">{state.usd}</div>
                <div className="w-full text-center p-5 text-lg text-main ">{state.usd_market_cap}</div>
                <div className="w-full text-center p-5 text-lg text-main ">{state.usd_24h_vol}</div>
                <div className="w-full text-center p-5 text-lg text-main ">{state.usd_24h_change}</div>
                <div className="w-full text-center p-5 text-lg text-main ">{state.last_updated_at}</div>
                <button className="w-full text-center p-5 text-lg text-main" onClick={(handleFav)}><i className={`fa-${fav?'solid':'regular'} fa-heart`}></i></button>
            </div>
        </NavLink>
    )
}