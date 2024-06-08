import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
import { loadMoreNFTS, setLoading } from "../redux/NFTSslice";
import NftInfo from "../components/nftInfo";
import Skeleton from "../components/nftSectionSkeleton";
import staticNftsData from '../staticNftsData.json'
import StaticNftSet from "../components/staticNftsSet";

export default function GlocalNftsPage() {
    const dynamicNFTS = useSelector(state => state.NFTSslice.neededNfts);
    const staticNFTS = staticNftsData
    const dispatch = useDispatch()
    const loading = useSelector(state => state.NFTSslice.loadingMoreNfts)
    const successfullyLoaded = useSelector(state => state.NFTSslice.successfullyLoaded)
    const [isPageEmpty, setIsPageEmpty] = useState(false);
    const location = useLocation();

    const renderDynamicNFTS = dynamicNFTS.map(el => {
        if (el !== "Loading...") {
            return <NftInfo key={el} id={el} />
        }
    })

    useEffect(() => {
        let timeOut = null;
        if (successfullyLoaded && loading) {
            timeOut = setTimeout(() => {
                dispatch(setLoading(false));
            }, 60000)
        }
        return () => clearTimeout(timeOut)
    }, [loading, successfullyLoaded])

    function handleLoadMore() {
        dispatch(loadMoreNFTS())
    }

    useEffect(() => {
        if (location.pathname === "/nfts") {
            if (staticNFTS.length === 0) {
                setIsPageEmpty(false)
            }
        }
    }, [location])

    return (
        <>
            {
                !isPageEmpty ?
                    <div className="nftsInfoContainer flex flex-col  my-40">
                        <StaticNftSet />
                        <div className="nftInfo flex flex-col justify-between items-center ">
                            <div className="grid grid-cols-3 gap-x-6 gap-y-10 w-full">
                                {renderDynamicNFTS}
                            </div>
                            {
                                loading ?
                                    <div className="w-full p-3 rounded-lg h-14 bg-secondary text-center capitalize text-xl">one minute...</div>
                                    : <button onClick={handleLoadMore} className="w-full p-3 rounded-lg h-14 bg-secondary hover:bg-darkSecondary capitalize text-xl ">load more</button>
                            }
                        </div>
                    </div>
                    :
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
            }
        </>
    )
}