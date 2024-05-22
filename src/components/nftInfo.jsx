
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addFavNft } from "../redux/favSlice";
import { useGetNftByIdQuery } from "../redux/API/apiSlice";
import defaultImage from '../assets/_52b6b019-af38-4bd4-b148-405628d2815b.jpg'

export default function NftInfo({id}) {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.favSlice.nfts)
    const [fav,setFav] = useState(false);
    const {data} = useGetNftByIdQuery(id);
    const [componentState,setComponentState] = useState({
        name:"Loading...",
        description:"Loading...",
        image:defaultImage,
        price:"Loading...",
        homepage:"Loading..."
    })

    useEffect(()=>{
        if(selector.includes(id)){
            setFav(true);
        }
    },[selector])

    useEffect(()=>{
        if(data){
            console.log("fetchingNFT.data",data);
            const {name,description,image,floor_price,links} = data
            const updaterObject = {
                name,
                description,
                image,
                price:floor_price.usd,
                homepage:links.homepage,
            }
            setComponentState(updaterObject)
        }
    },[data])

    function handleFav(e) {
        e.preventDefault();
        dispatch(addFavNft(id));
    }


    return (
        <NavLink to={`/nft/:${id}`} className="coinInfo  hover:bg-darkMainBg h-auto border-t-2 border-t-main ">
            <div className="nftBox flex justify-between w-full items-center relative">
                <img className="w-1/2" src={componentState.image} alt="nft"/>
                <div className="info flex flex-col w-1/2">
                    <div className="name">{componentState.name}</div>
                    <div className="description">{componentState.description}</div>
                    <div className="price">{componentState.price}</div>
                    <a href={componentState.homepage}>home page</a>
                </div>
                <button className="w-full text-center p-5 text-lg text-main absolute top-1 left-1" onClick={(handleFav)}><i className={`fa-${fav?'solid':'regular'} fa-heart`}></i></button>
            </div>
        </NavLink>
    )
}