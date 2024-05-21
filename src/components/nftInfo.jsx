
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addFavNft } from "../redux/favSlice";

export default function NftInfo({data}) {
    const { asset_platform_id, contract_address, id, name, symbol} = data;
    const dispatch = useDispatch()
    const selector = useSelector(state => state.favSlice.nfts)
    const [fav,setFav] = useState(false);

    useEffect(()=>{
        if(selector.includes(id)){
            setFav(true);
        }
    },[selector])

    function handleFav(e) {
        e.preventDefault();
        dispatch(addFavNft(id));
    }


    return (
        <NavLink to={`/nft/:${id}`} className="coinInfo  hover:bg-darkMainBg border-t-2 border-t-main">
            <div className="row  flex justify-between items-center ">
                <div className="w-full text-center p-5 text-lg text-main ">{id}</div>
                <div className="w-full text-center p-5 text-lg text-main ">{asset_platform_id}</div>
                <div className="w-full text-center p-5 text-lg text-main ">{contract_address}</div>
                <div className="w-full text-center p-5 text-lg text-main ">{name}</div>
                <div className="w-full text-center p-5 text-lg text-main ">{symbol}</div>
                <button className="w-full text-center p-5 text-lg text-main" onClick={(handleFav)}><i className={`fa-${fav?'solid':'regular'} fa-heart`}></i></button>
            </div>
        </NavLink>
    )
}