import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CoinInfo from "../components/coinInfo"
import FavNft from "../components/favNft"
import SingleExchange from "../components/singleExchange"
import Heading from "../components/heading"

export default function FavItmes() {
    const favCoins = useSelector(state => state.favSlice.coins)
    const favNFTS = useSelector(state => state.favSlice.nfts)
    const favExchanges = useSelector(state => state.favSlice.exchanges)

    const [empty,setEmpty] = useState({
        coins:true,
        nfts:true,
        exchanges:true,
    })

    useEffect(() => {
        setEmpty({...empty,coins:!(favCoins.length > 0), nfts:!(favNFTS.length > 0), exchanges:!(favExchanges.length > 0) })
    }, [favCoins, favNFTS,favExchanges])

    const renderFavCoins = favCoins.map(el => {
        return <CoinInfo key={el} id={el} />
    })

    const renderFavNfts = favNFTS.map(el => {
        return <FavNft key={el.id} FavNftData={el} />
    })
    const renderFavExchanges = favExchanges.map(el=>{
        return <SingleExchange key={el.id} exchangeData={el}/>
    })
    return (
        <div className="favPage bg-mainBG pb-40">
            <Heading title={"favourite coins"} />
            <div className="flex flex-col gap-2">
            {empty.coins ? <span className="p-4 text-3xl text-main">No favourite coins...</span> : renderFavCoins}
            </div>
            <Heading title={"favourite nfts"} />
            <div className="flex flex-col gap-2">
            {empty.nfts ? <span className="p-4 text-3xl text-main">No favourite nfts...</span> : renderFavNfts}
            </div>
            <Heading title={"favourite exchanges"} />
            <div className="flex flex-col gap-2">
            {empty.exchanges ? <span className="p-4 text-3xl text-main">No favourite exchanges...</span> : renderFavExchanges}
            </div>
        </div>
    )
}