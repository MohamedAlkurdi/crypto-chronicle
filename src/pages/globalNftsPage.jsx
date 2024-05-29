import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useLocation } from "react-router-dom";
import SingleNftDataDisplayer from "../components/singleNftDataDisplayer";
import { loadMoreNFTS, setLoading } from "../redux/NFTSslice";
import NftInfo from "../components/nftInfo";
import Skeleton from "../components/nftSectionSkeleton";

export default function GlocalNftsPage() {
    const loadingError = useSelector(state => state.NFTSslice.NFTSloadingError)
    const dynamicNFTS = useSelector(state => state.NFTSslice.neededNfts);
    const loadedData = useSelector(state => state.NFTSslice.loadedNFTS);
    // const isPageEmpty = useSelector(state => state.NFTSslice.isPageEmpty)
    const staticNFTS = useSelector(state => state.NFTSslice.loadedNFTS)
    const dispatch = useDispatch()
    // const [renderedNFTS, setRenderedNFTS] = useState([])
    const [staticNftsState, setStaticNftsState] = useState([])
    const loading = useSelector(state => state.NFTSslice.loadingMoreNfts)
    const NFTSloadingError = useSelector(state => state.NFTSslice.NFTSloadingError)
    const [isPageEmpty, setIsPageEmpty] = useState(false);
    const location = useLocation();

    // useEffect(() => {
    //     console.log("renderedNFTS",renderedNFTS)
    //     console.log("selector",dynamicNFTS)
    //     setRenderedNFTS(dynamicNFTS)
    // }, [dynamicNFTS])

    // useEffect(()=>{
    //     if(staticNFTS.length !== 0){ setStaticNftsState(staticNFTS)}
    //     console.log("loaded nfts:",staticNFTS)
    // },[staticNFTS])


    // useEffect(() => {
    //     console.log("loaded nfts:", dynamicNFTS)
    // }, [dynamicNFTS])

    useEffect(()=>{
        console.log(dynamicNFTS)
    },[dynamicNFTS])

    const renderDynamicNFTS = dynamicNFTS.map(el => {
        if (el !== "Loading...") {
            return <NftInfo key={el} id={el} />
        }
    })

    useEffect(()=>{
        setTimeout(()=>{
            dispatch(setLoading(false))
        },60000)
    },[dynamicNFTS])

    const renderStaticNFTS = staticNftsState.map(el=>{
        if(staticNftsState.length !== 0){
            return <SingleNftDataDisplayer key={el.id} componentState={el} />
        }
    })


    // function handleLoading() {
    //     dispatch(setLoading(true))
    //     const timeOut = setTimeout(() => {
    //         dispatch(setLoading(false))
    //     }, 60000)
    //     return () => { clearTimeout(timeOut) }
    // }

    function handleLoadMore() {
        // handleLoading();
        console.log("LLLLLLLLLOOOOOOOOOOOOOOOOAAAAAAAAAAAAAAAADDDDDDDDDDDDDDDIIIIIIIIIIIIIIINNNNNNNNNNNNNNGGGGGGGGGGGGGGG")
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
                        <div className="nftInfo flex flex-col justify-between items-center ">
                            <div className="grid grid-cols-3 gap-x-6 gap-y-10 w-full">
                                {renderStaticNFTS}
                                {/* {renderDynamicNFTS} */}
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