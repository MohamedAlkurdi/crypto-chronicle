import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function SearchOutput(){
    const {coins,nfts,exchanges} = useSelector(state=>state.searchSlice.output);
    const match = useSelector(state=>state.searchSlice.match);

    // useEffect(()=>{
    //     console.log("match state:",match)
    //     if(match){
    //         console.log(output);
    //     }else{
    //         console.log("no match")
    //     }
    // },[coins,match])
    const renderCoins = coins?.map(el=>{
        return <div key={el.id}>{el.id}</div>
    })
    const renderNfts = nfts?.map(el=>{
        return <div key={el.id}>{el.id}</div>
    })
    const renderExchanges = exchanges?.map(el=>{
        return <div key={el.id}>{el.id}</div>
    })

    return(
        <>
        <h1>coins:</h1>
        <div>{renderCoins.length === 0 ? "No match." : renderCoins}</div>
        <h1>nfts:</h1>
        <div>{renderNfts.length === 0? "No match." : renderNfts}</div>
        <h1>exchanges:</h1>
        <div>{renderExchanges.length === 0 ? "No match." : renderExchanges}</div>
        </>
    )
}