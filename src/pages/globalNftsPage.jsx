import { useEffect } from "react";
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import SingleNftDataDisplayer from "../components/singleNftDataDisplayer";

export default function GlocalNftsPage(){
    const selector = useSelector(state =>state.NFTSslice.loadedNFTS);

    useEffect(()=>{
        console.log(selector)
    },[selector])

    const renderTheNFTS = selector.map(el=>{
        if(el !== "Loading..."){
        return <SingleNftDataDisplayer key={el.id} componentState={el}/>
    }
    })
return(
    <div className="nftsInfoContainer flex flex-col  my-40">
            <div className="nftInfo flex flex-col justify-between items-center ">
                <div className="grid grid-cols-3 gap-x-6 gap-y-10 w-full">
                    {renderTheNFTS}
                </div>
                <NavLink to={'/nfts'} className="w-full p-3 h-14 bg-secondary text-main hover:bg-darkSecondary text-center capitalize text-xl">load more</NavLink>
            </div>
        </div>
)
}