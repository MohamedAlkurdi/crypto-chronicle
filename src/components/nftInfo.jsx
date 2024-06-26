import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useGetNftByIdQuery } from "../redux/API/apiSlice";
import { addLoadedNFT } from '../redux/NFTSslice';
import { handleCallsLimitError } from "../modules/errorHandlers";
import { handle_global_429_error } from "../redux/generalData";
import defaultImage from '../assets/pexels-davidmcbee-730564.jpg';
import SingleNftDataDisplayer from "./singleNftDataDisplayer";

export default function NftInfo({ id }) {
    const dispatch = useDispatch();
    const loadedNFTS = useSelector(state => state.NFTSslice.loadedNFTS);
    const is_429_error = useSelector(state => state.generalData.global_429_error);
    const {isSuccess, isError, data, error} = useGetNftByIdQuery(id);
    const [componentState, setComponentState] = useState({
        id,
        name: "Loading...",
        description: "Loading...",
        image: defaultImage,
        price: "Loading...",
        homepage: "Loading..."
    });

    useEffect(() => {
        if (isError) {
            if(error.status===429){
                dispatch(handle_global_429_error(true))
            }
        }
    }, [isError]);

    useEffect(()=>{
        if(is_429_error){
            handleCallsLimitError();
        }
    },[is_429_error])

    useEffect(() => {
        if (isSuccess) {
            let { name, description, image, floor_price, links } = data;
            const updaterObject = {
                id,
                name,
                description,
                image: image.small,
                price: floor_price.usd,
                homepage: links.homepage,
            };
            dispatch(addLoadedNFT(updaterObject));
            setComponentState(updaterObject);
        }
    }, [isSuccess, loadedNFTS, id, dispatch, data]);

    return (
            <SingleNftDataDisplayer
                componentState={componentState}
            />
    );
}
