import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CoinInfo from "../components/coinInfo"
import FavNft from "../components/favNft"
import SingleExchange from "../components/singleExchange"

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
        <>
            <h1>favourite coins:</h1>
            {empty.coins ? "No fav coins..." : renderFavCoins}
            <h1>favourite coins:</h1>
            {empty.nfts ? "No fav nfts..." : renderFavNfts}
            <h1>favourite exchanges:</h1>
            {empty.exchanges ? "No fav exchanges..." : renderFavExchanges}
        </>
    )
}