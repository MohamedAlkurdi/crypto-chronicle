import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleExchangeQuery } from "../redux/API/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { handle_global_429_error } from "../redux/generalData";
import { handle_global_404_error } from "../redux/generalData";
import { handleCallsLimitError } from "../modules/errorHandlers";
import { handleNewExchange } from "../redux/favSlice";
import Server_404 from "./server_404";

export default function ExchangePage() {
    const id = useParams().id.substring(1);
    const { data, isSuccess, isError, error } = useGetSingleExchangeQuery(id)
    const is_429_error = useSelector(state => state.generalData.global_429_error);
    const is_404_error = useSelector(state => state.generalData.global_404_error);
    const favExchanges = useSelector(state => state.favSlice.exchanges)
    const dispatch = useDispatch()
    const [fav, setFav] = useState(false);
    const [exchangeData, setExchangeData] = useState({
        name: "Loading...",
        year_established: "Loading...",
        country: "Loading...",
        description: "Loading...",
        url: "Loading...",
        image: "Loading...",
        trust_score_rank: 0,
        trade_volume_24h_btc: 8362.40328149373,
        media: [
            "facebook","www.google.com",
            "reddit","www.google.com",
            "telegram","www.google.com",
        ]
    })

    useEffect(() => {
        const isFav = favExchanges.some(el=>( el.id === id));
        setFav(isFav)
    }, [favExchanges])

    useEffect(() => {
        if (isError) {
            if (error.status === 429) {
                dispatch(handle_global_429_error(true))
            }
            if (error.status === 404) {
                dispatch(handle_global_404_error(true))
            }
        }
    }, [isError])

    useEffect(() => {
        if (is_429_error) {
            handleCallsLimitError()
        }
        if(is_429_error){
            console.log("404 error detected!!!!!!!!!!!!!!!!");
        }
    }, [is_429_error,is_404_error])

    useEffect(() => {
        if (isSuccess) {
            const {
                name,
                year_established,
                country,
                description,
                url,
                image,
                trade_volume_24h_btc,
                trust_score_rank,
                facebook_url,
                reddit_url,
                telegram_url,
            } = data;
            const updaterObject = {
                name,
                year_established,
                country,
                description,
                url,
                image,
                trade_volume_24h_btc,
                trust_score_rank,
                media: [
                    ["facebook",facebook_url],
                    ["reddit",reddit_url],
                    ["telegram",telegram_url],
                ]
            };
            setExchangeData(updaterObject);
        }
    }, [isSuccess, id, data]);

    function handleFav(e) {
        e.preventDefault();
        dispatch(handleNewExchange({ id, name:exchangeData.name, year_established:exchangeData.year_established, image:exchangeData.image, trust_score_rank:exchangeData.trust_score_rank }));
    }

    useEffect(() => {
        console.log("exchange page id:", id);
    }, [id])
    return (
        <>
        {is_404_error? <Server_404/> :
        <div className="exchangeInfoPage flex flex-col gap-10 p-8">
            <div className="exchangeOverview flex items-center gap-8 bg-secondary p-4 rounded-lg bg-gradient-to-br from-secondary from-30% to-darkSecondary to-70% relative">
                <div className="nameImagePrice flex flex-col w-[20%] items-center gap-4 ">
                    <div className=" text-4xl text-main overflow-hidden text-center">{exchangeData.name}</div>
                    <img className="w-[80%] " src={exchangeData.image} alt="Coin Image" />
                    <div className=" text-4xl text-main overflow-hidden">Rank: {exchangeData.trust_score_rank}</div>
                </div>
                <div className=" w-[80%] text-main" dangerouslySetInnerHTML={{ __html: (exchangeData.description || "No desctiption available.") }}></div>
                <button className=" w-7 h-7 absolute text-center text-lg text-main top-4 right-4 overflow-hidden" onClick={(handleFav)}><i className={`fa-${fav ? 'solid' : 'regular'} fa-heart w-full h-full`}></i></button>
            </div>
            <div className="additionalData flex items-center gap-8 bg-secondary p-4 rounded-lg text-main bg-gradient-to-tl from-darkSecondary from-30% to-secondary to-70% ">
                <div className="stats w-full">
                    <div className=" text-xl"><span className="capitalize">Year established: </span> {exchangeData.year_established}</div>
                </div>
                <div className="stats w-full">
                    <div className=" text-xl"><span className="originCountry">Origin country: </span> {exchangeData.country}</div>
                </div>
            </div>
            <div className="additionalData flex items-center gap-8 bg-secondary p-4 rounded-lg text-main bg-gradient-to-tl from-darkSecondary from-30% to-secondary to-70% ">
                <div className="stats w-full">
                    <div className=" text-xl"><span className="marketSells">bitcoin trade volume in the last 24 hours: </span> {exchangeData.trade_volume_24h_btc}</div>
                </div>
            </div>
            <div className="additionalData flex items-center gap-8 bg-secondary p-4 rounded-lg text-main bg-gradient-to-tl from-darkSecondary from-30% to-secondary to-70% ">
                <div className="links w-1/2">
                    <a href={exchangeData.url} target="blank" className="">Click here to visit {exchangeData.name}`s website. </a>
                </div>
            </div>
            <div className="changeState bg-main p-4 rounded-lg flex items-center justify-around text-xl text-secondary">
                {exchangeData.media.map((ch, index) => (
                    <div className="flex flex-col items-center p-2 bg-secondary text-main rounded-md" key={index}>
                        <p className="changeTitle"></p>
                        <a href={ch[1]} target="blank">{ch[0]}</a>
                    </div>
                ))}
            </div>
        </div>
        }
        </>
    )
}