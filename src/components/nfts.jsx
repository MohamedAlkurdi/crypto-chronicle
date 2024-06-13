import { useEffect, useState } from "react";
import { NavLink, useLocation } from 'react-router-dom'
import { useGetNftListQuery } from "../redux/API/apiSlice";
import NftInfo from "./nftInfo";
import { handleCallsLimitError } from "../modules/errorHandlers";
import { useDispatch, useSelector } from "react-redux";
import { handle_global_429_error } from "../redux/generalData";
import StaticNftSet from "./staticNftsSet";

export default function Nfts() {
    const { data, isSuccess, isError, isLoading, error } = useGetNftListQuery();
    const loadingNFTS = useSelector(state => state.NFTSslice.loadingMoreNfts)
    const NFTSloadingError = useSelector(state => state.NFTSslice.NFTSloadingError)
    const dispatch = useDispatch()
    const is_429_error = useSelector(state => state.generalData.global_429_error);
    const location = useLocation();
    const [renderedNFTS, setRenderedNFTS] = useState([
        "Loading...",
    ])

    useEffect(() => {
        if (isSuccess) {
            const updaterObject = [];
            for (let i = 0; i < 3; i++) {
                updaterObject.push(data[i].id);
            }
            setRenderedNFTS(updaterObject);
        }
        if (isError) {
            if (error.status === 429)
                dispatch(handle_global_429_error(true))
            handleCallsLimitError();
        }

    }, [isSuccess, isError])

    const renderTheNFTS = renderedNFTS.map(el => {
        if (el !== "Loading...") {
            return <NftInfo key={el} id={el} />
        }
    })

    useEffect(() => {
        // if(location.pathname === "/nfts"){
        //     if(loadedNFTS.length === 0){
        //         dispatch
        //     }
        // }
    }, [location])

    useEffect(() => {
        if (is_429_error) {
            handleCallsLimitError()
        }
    }, [is_429_error])

    return (
        <div className="nftsInfoContainer flex flex-col">
            <div className="nftInfo flex flex-col justify-between items-center ">
                <StaticNftSet/>
                <NavLink to={'/nfts'} className="w-full p-3 h-14 bg-main text-secondary hover:bg-lightMain text-center capitalize text-xl">learn more</NavLink>
            </div>
        </div>
    )
}

