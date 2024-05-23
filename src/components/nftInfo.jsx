
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useGetNftByIdQuery } from "../redux/API/apiSlice";
import defaultImage from '../assets/pexels-davidmcbee-730564.jpg'
import {addLoadedNFT} from '../redux/NFTSslice'
import { handleCallsLimitError } from "../modules/errorHandlers";
import SingleNftDataDisplayer from "./singleNftDataDisplayer";

export default function NftInfo({id}) {
    const dispatch = useDispatch()
    const {data,isError,isSuccess} = useGetNftByIdQuery(id);

    const [componentState,setComponentState] = useState({
        id,
        name:"Loading...",
        description:"Loading...",
        image:defaultImage,
        price:"Loading...",
        homepage:"Loading..."
    })

    function shortenText(text = 'Loading...'){
        if(text.length > 170){
            return text.slice(0,160) + '...(click for more details)'
        }
        return text;
    }

    useEffect(()=>{
        if(isError){
            handleCallsLimitError()
        }
    },[isSuccess,isError])

    useEffect(()=>{
        if(isSuccess){
            let {name,description,image,floor_price,links} = data
            description = shortenText(description)
            const updaterObject = {
                id,
                name,
                description,
                image:image.small,
                price:floor_price.usd,
                homepage:links.homepage,
            }
            console.log('addLoadedNFT')
            dispatch(addLoadedNFT(updaterObject));
            setComponentState(updaterObject)
        }
    },[isSuccess])


    return (
        <NavLink to={`/nft/:${id}`} className="coinInfo  hover:bg-darkMainBg h-auto border-t-2 border-t-main p-4 ">
            <SingleNftDataDisplayer 
                componentState={componentState} 
            />
        </NavLink>
    )
}