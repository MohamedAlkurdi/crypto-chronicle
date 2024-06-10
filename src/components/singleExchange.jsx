import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { handleNewExchange } from "../redux/favSlice";
import defaultImage from '../assets/pexels-davidmcbee-730564.jpg';


export default function SingleExchange({ exchangeData }) {
    const favExchanges = useSelector(state => state.favSlice.exchanges)
    const dispatch = useDispatch();
    const [fav,setFav] = useState(false);
    console.log("passed data to single exchange compoenent:",exchangeData)
    const { id, name, year_established, image, trust_score_rank } = exchangeData

    useEffect(()=>{
        const isFav = favExchanges.some(el=>el.id === id)
        setFav(isFav);
    },[favExchanges])

    useEffect(()=>{
        console.log(id,name,year_established,image,trust_score_rank)
    },[id,name,year_established,image,trust_score_rank])

    function handleFav(e){
        e.preventDefault();
        dispatch(handleNewExchange({id, name, year_established, image, trust_score_rank}));
    }

    return (
        <NavLink to={`/singleExchange/:${id}`} className="coinInfo  hover:bg-darkMainBg border-t-2 border-t-main">
            <div className="row flex justify-between items-center w-full ">
                <img className="w-1/3 text-center p-5 text-lg text-main " src={image || defaultImage} alt="exchangeImage" />
                <div className="w-full text-center p-5 text-lg text-main ">{name || "Unknown"}</div>
                <div className="w-full text-center p-5 text-lg text-main ">{year_established || "Unknown"}</div>
                <div className="w-full text-center p-5 text-lg text-main ">{trust_score_rank || "Unknown"}</div>
                <button className="w-full text-center p-5 text-lg text-main" onClick={(handleFav)}><i className={`fa-${fav ? 'solid' : 'regular'} fa-heart`}></i></button>
            </div>
        </NavLink>
    )
}