import { useEffect, useState } from "react";
import { useGetNftListQuery } from "../redux/API/apiSlice";
import NftInfo from "./nftInfo";

export default function Nfts() {
    const { data, isSuccess, isError, isLoading } = useGetNftListQuery();
    const [AllowedToLoad, setAllowedToLoad] = useState(false)
    const [renderedNFTS, setRenderedNFTS] = useState([
        { asset_platform_id: "Loading...", contract_address: "Loading...", id: "Loading...", name: "Loading...", symbol: "Loading..." }
    ])
    function renderNfts(array) {
        try {
            return array.map(el => {
                return <CoinInfo id={el} key={el} />
            })
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (isSuccess) {
            const updaterObject = [];
            for (let i = 0; i < 5; i++) {
                updaterObject.push(data[i]);
            }
            setRenderedNFTS(updaterObject);
        }
    }, [isSuccess])

    const renderNFTS = renderedNFTS.map(el => {
        return <NftInfo key={el.id} data={el} />
    })

    return (
        <div className="nftsInfoContainer flex flex-col">
            <div className="nftInfo flex justify-between items-center ">
                <div className="w-full text-center font-bold p-5 text-xl capitalize text-main ">asset_platform_id</div>
                <div className="w-full text-center font-bold p-5 text-xl capitalize text-main ">contract_address</div>
                <div className="w-full text-center font-bold p-5 text-xl capitalize text-main ">id</div>
                <div className="w-full text-center font-bold p-5 text-xl capitalize text-main ">name</div>
                <div className="w-full text-center font-bold p-5 text-xl capitalize text-main ">symbol</div>
                <div className="w-full text-center font-bold p-5 text-xl capitalize text-main ">fav</div>
            </div>
            {renderNFTS}
        </div>
    )
}

