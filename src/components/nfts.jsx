import { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom'
import { useGetNftListQuery } from "../redux/API/apiSlice";
import NftInfo from "./nftInfo";
import { handleCallsLimitError } from "../modules/errorHandlers";

export default function Nfts() {
    const { data, isSuccess, isError, isLoading } = useGetNftListQuery();
    const [renderedNFTS, setRenderedNFTS] = useState([
        "Loading...",
    ])


    useEffect(() => {
        if (isSuccess) {
            const updaterObject = [];
            for (let i = 0; i < 4; i++) {
                updaterObject.push(data[i].id);
            }
            setRenderedNFTS(updaterObject);
            console.log("updaterObject",updaterObject)
        }
        if(isError){
            handleCallsLimitError();
        }

    }, [isSuccess,isError])

    const renderTheNFTS = renderedNFTS.map(el=>{
        if(el !== "Loading..."){
        return <NftInfo key={el} id={el}/>
    }
    })

    return (
        <div className="nftsInfoContainer flex flex-col  my-40">
            <div className="nftInfo flex flex-col justify-between items-center ">
                <div className="grid grid-cols-3 gap-x-6 gap-y-10 w-full">
                    {renderTheNFTS}
                </div>
                <NavLink to={'/nfts'} className="w-full p-3 h-14 bg-main text-secondary hover:bg-lightMain text-center capitalize text-xl">learn more</NavLink>
            </div>
        </div>
    )
}

