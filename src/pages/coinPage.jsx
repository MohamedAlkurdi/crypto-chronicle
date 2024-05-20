import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { useGetCoinByIdQuery } from "../redux/API/apiSlice"
import defaultImage from '../assets/_d7457e79-4a4f-49eb-831c-99a1ff31f82f.jpg'
import AreaChartComponent from "../components/coinChart"

export default function CoinPage(){
    const id = useParams().id.substring(1);
    const location = useLocation()
    const fetchingCoinData = useGetCoinByIdQuery(id)
    const [coinsData,setCoinData] = useState({
        image:defaultImage,
        description:"loading...",
    })
    
    useEffect(()=>{
        if(fetchingCoinData.isSuccess){
            const {description,image,links,localization,market_cap_rank,market_data} = fetchingCoinData.data;
            console.log(description.en,image.large,links.blockchain_site[0],links.homepage[0],localization.en,market_cap_rank,market_data.current_price.usd)
        }
    },[])

    useEffect(()=>{
        console.log("coin page location info",location)
    },[])

    useEffect(()=>{
        console.log("fetched coin by id:",fetchingCoinData)
    },[fetchingCoinData])

    return(
        <>
        <div className="pb-16">coin page {id} </div>
        <AreaChartComponent/>
        </>
    )
}