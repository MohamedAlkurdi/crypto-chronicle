import { useEffect, useState } from "react";
import CoinInfo from "./coinInfo"
import { useDispatch, useSelector } from "react-redux";
import { loadMoreCoins } from "../redux/generalData";

export default function Coins(){
    const neededCoins = useSelector(state=>state.generalData.neededCoins);
    const [loading,setLoading] = useState(false)

    function handleLoading(){
        setLoading(true);
        const timeOut = setTimeout(()=>{
            setLoading(false)
        },60000)

        return ()=>{clearTimeout(timeOut)}
    }
    const dispatch = useDispatch();
    function handleLoadMore(){
        handleLoading();
        dispatch(loadMoreCoins())
    }
    useEffect(()=>{
        console.log(neededCoins)
    },[])

    //5 calls
    const renderCoinsInfo = Array.from(neededCoins).map(el=>{
        return <CoinInfo id={el}/>
    })

    return(
        <div className="coinsInfoContainer flex flex-col">
            <div className="coinInfo flex justify-between items-center ">
            <div className="w-full font-bold p-5 text-xl capitalize text-main ">ID</div>
            <div className="w-full font-bold p-5 text-xl capitalize text-main ">Price</div>
            <div className="w-full font-bold p-5 text-xl capitalize text-main ">market cap</div>
            <div className="w-full font-bold p-5 text-xl capitalize text-main ">24h $ volume</div>
            <div className="w-full font-bold p-5 text-xl capitalize text-main ">24h $ cahnge</div>
            <div className="w-full font-bold p-5 text-xl capitalize text-main ">last update</div>
        </div>
            {renderCoinsInfo}
            {loading ? <div className="w-full p-3 rounded-lg h-14 bg-secondary text-center capitalize text-xl">one minute...</div> : <button onClick={handleLoadMore} className="w-full p-3 rounded-lg h-14 bg-secondary hover:bg-darkSecondary capitalize text-xl ">load more</button>}
        </div>
    )
}