import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useGetNftByIdQuery } from "../redux/API/apiSlice";
import { handle_global_429_error } from "../redux/generalData";
import { handleCallsLimitError } from "../modules/errorHandlers";
import { handleColor } from "../modules/dynamicStyles";
import { addFavNft } from "../redux/favSlice";
import defaultImage from '../assets/pexels-davidmcbee-730564.jpg';

export default function NftPage() {
    const id = useParams().id.substring(1);
    const dispatch = useDispatch();
    const { data, isSuccess, isError, error } = useGetNftByIdQuery(id);
    const is_429_error = useSelector(state => state.generalData.global_429_error);
    const favNFTS = useSelector(state => state.favSlice.nfts)
    const [fav, setFav] = useState(false);
    const [nftData, setNftData] = useState({
        id,
        name: "Loading...",
        description: "Loading...",
        image: defaultImage,
        price: "Loading...",
        native_currency: "Loading...",
        homepage: "Loading...",
        market_cap_rank: "Loading...",
        changes: ['loading...']
    });

    useEffect(() => {
        setFav(favNFTS.includes(id))
    }, [favNFTS])

    function handleFav(e) {
        e.preventDefault();
        dispatch(addFavNft(id));
    }

    useEffect(() => {
        if (is_429_error) {
            handleCallsLimitError();
        }
    }, [is_429_error])

    useEffect(() => {
        if (isError) {
            if (error.status === 429) {
                dispatch(handle_global_429_error(true))
            }
        }
    }, [isError]);



    useEffect(() => {
        if (isSuccess) {
            const {
                name,
                description,
                image,
                links,
                floor_price,
                native_currency,
                market_cap,
                floor_price_7d_percentage_change,
                floor_price_14d_percentage_change,
                floor_price_30d_percentage_change,
                floor_price_60d_percentage_change,
                floor_price_1y_percentage_change
            } = data;
            const updaterObject = {
                id,
                name,
                description,
                image: image.small,
                current_price: floor_price.usd,
                native_currency: native_currency,
                homepage: links.homepage,
                market_cap: market_cap.usd,
                changes: [
                    [floor_price_7d_percentage_change.usd.toFixed(3), '7d'],
                    [floor_price_14d_percentage_change.usd.toFixed(3), '14d'],
                    [floor_price_30d_percentage_change.usd.toFixed(3), '30d'],
                    [floor_price_60d_percentage_change.usd.toFixed(3), '60d'],
                    [floor_price_1y_percentage_change.usd.toFixed(3), '1y'],
                ]
            };
            setNftData(updaterObject);
        }
    }, [isSuccess, id, data]);

    return (
        <div className="nftInfoPage flex flex-col gap-10 p-8">
            <div className="nftOverview flex items-center gap-8 bg-secondary p-4 rounded-lg bg-gradient-to-br from-secondary from-30% to-darkSecondary to-70% relative">
                <div className="nameImagePrice flex flex-col w-[20%] items-center gap-4 ">
                    <div className=" text-4xl text-main overflow-hidden text-center">{nftData.name}</div>
                    <img className="w-[80%] " src={nftData.image} alt="Coin Image" />
                    <div className=" text-4xl text-main overflow-hidden">{nftData.current_price}$</div>
                </div>
                <div className=" w-[80%] text-main" dangerouslySetInnerHTML={{ __html: (nftData.description || "No desctiption available.") }}></div>
                <button className=" w-7 h-7 absolute text-center text-lg text-main top-4 right-4 overflow-hidden" onClick={(handleFav)}><i className={`fa-${fav ? 'solid' : 'regular'} fa-heart w-full h-full`}></i></button>
            </div>
            <div className="additionalData flex items-center gap-8 bg-secondary p-4 rounded-lg text-main bg-gradient-to-tl from-darkSecondary from-30% to-secondary to-70% ">
                <div className="stats w-1/2">
                    <div className=" text-xl"><span className="capitalize">market cap value:</span> {nftData.market_cap}$</div>
                </div>
                <div className="links w-1/2">
                    <a href={nftData.homepage} target="blank" className="">Click here to visit {nftData.name}`s website. </a>
                </div>
            </div>
            <div className="additionalData flex items-center gap-8 bg-secondary p-4 rounded-lg text-main bg-gradient-to-tl from-darkSecondary from-30% to-secondary to-70% ">
                <div className="stats w-1/2">
                    <div className=" text-xl">native currency: {nftData.native_currency}</div>
                </div>
                <NavLink to={`/coin/:${nftData.native_currency}`}>Click to visit the coin page</NavLink>
            </div>
            <div className="changeState bg-main p-4 rounded-lg flex items-center justify-between text-xl text-secondary">
                {nftData.changes.map((ch, index) => (
                    <div className="flex flex-col items-center p-2 bg-secondary text-main rounded-md" key={index}>
                        <p className="changeTitle">{ch[1]}</p>
                        <p className={` ${handleColor(ch[0])} changePercentage`}>{ch[0]}%</p>
                    </div>
                ))}
            </div>
        </div>
    )
}