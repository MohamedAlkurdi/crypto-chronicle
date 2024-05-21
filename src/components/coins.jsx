import { useEffect, useState } from "react";
import CoinInfo from "./coinInfo"
import { useDispatch, useSelector } from "react-redux";
import { loadMoreCoins } from "../redux/generalData";
import { NavLink } from "react-router-dom";
import { staticCoins } from "../staticData";

export default function Coins() {
    const [loading, setLoading] = useState(false)
    const [AllowedToLoad, setAllowedToLoad] = useState(false)
    const neededCoins = Array.from(useSelector(state => state.generalData.neededCoins));
    const dispatch = useDispatch();

    function handleLoading() {
        setLoading(true);
        const timeOut = setTimeout(() => {
            setLoading(false)
        }, 60000)
        return () => { clearTimeout(timeOut) }
    }

    function handleLoadMore() {
        handleLoading();
        dispatch(loadMoreCoins())
    }

    useEffect(() => {
        if (location.pathname !== '/') {
            setAllowedToLoad(true)
        }
    }, [location])

    function renderCoins(array) {
        try {
            return array.map(el => {
                return <CoinInfo id={el} key={el} />
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="coinsInfoContainer flex flex-col my-40">
            <div className="coinInfo flex justify-between items-center ">
                <div className="w-full text-center font-bold p-5 text-xl capitalize text-main ">ID</div>
                <div className="w-full text-center font-bold p-5 text-xl capitalize text-main ">Price</div>
                <div className="w-full text-center font-bold p-5 text-xl capitalize text-main ">market cap</div>
                <div className="w-full text-center font-bold p-5 text-xl capitalize text-main ">24h $ volume</div>
                <div className="w-full text-center font-bold p-5 text-xl capitalize text-main ">24h $ cahnge</div>
                <div className="w-full text-center font-bold p-5 text-xl capitalize text-main ">last update</div>
                <div className="w-full text-center font-bold p-5 text-xl capitalize text-main ">fav</div>
            </div>
            {AllowedToLoad ? renderCoins(neededCoins) : renderCoins(staticCoins)}
            {AllowedToLoad ?
                loading ?
                    <div className="w-full p-3 rounded-lg h-14 bg-secondary text-center capitalize text-xl">one minute...</div>
                    : <button onClick={handleLoadMore} className="w-full p-3 rounded-lg h-14 bg-secondary hover:bg-darkSecondary capitalize text-xl ">load more</button>
                : <NavLink to={'/coins'} className="w-full p-3 h-14 bg-main text-secondary hover:bg-lightMain text-center capitalize text-xl">learn more</NavLink>}
        </div>
    )
}