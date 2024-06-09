import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CoinInfo from "../components/coinInfo"
import FavNft from "../components/favNft"

export default function FavItmes() {
    const favCoins = useSelector(state => state.favSlice.coins)
    const favNFTS = useSelector(state => state.favSlice.nfts)
    const [empty,setEmpty] = useState({
        coins:true,
        nfts:true
    })

    useEffect(() => {
        setEmpty({...empty,coins:!(favCoins.length > 0), nfts:!(favNFTS.length > 0) })
    }, [favCoins, favNFTS])

    const renderFavCoins = favCoins.map(el => {
        return <CoinInfo key={el} id={el} />
    })

    const renderFavNfts = favNFTS.map(el => {
        return <FavNft key={el.id} FavNftData={el} />
    })
    return (
        <>
            <h1>favourite coins:</h1>
            {empty.coins ? "No fav coins..." : renderFavCoins}
            <h1>favourite coins:</h1>
            {empty.nfts ? "No fav nfts..." : renderFavNfts}
        </>
    )
}