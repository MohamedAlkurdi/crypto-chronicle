import { useEffect } from "react"
import { useSelector } from "react-redux"
import CoinInfo from "../components/coinInfo"
import FavNft from "../components/favNft"

export default function FavItmes() {
    const favCoins = useSelector(state => state.favSlice.coins)
    const favNFTS = useSelector(state => state.favSlice.nfts)

    useEffect(() => {
        console.log("favCoins", favCoins);
        console.log("favNFTS", favNFTS);
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
            {renderFavCoins}
            <h1>favourite coins:</h1>
            {renderFavNfts}
        </>
    )
}