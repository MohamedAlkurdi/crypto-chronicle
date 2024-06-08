import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCoinByIdQuery } from "../redux/API/apiSlice";
import defaultImage from '../assets/_d7457e79-4a4f-49eb-831c-99a1ff31f82f.jpg';
import CoinChart from "../components/coinChart";
import TimeSliceOptions from "../components/timeSliceOptions";
import { useDispatch, useSelector } from "react-redux";
import { setChartError } from "../redux/chartSlice";
import { handleColor } from "../modules/dynamicStyles";
import DOMPurify from 'dompurify';
import { handle_global_429_error } from "../redux/generalData";
import { handleCallsLimitError } from "../modules/errorHandlers";
import { addFavCoin } from "../redux/favSlice";

export default function CoinPage() {
    const id = useParams().id.substring(1);
    const dispatch = useDispatch();
    const { data, isSuccess, isError, error } = useGetCoinByIdQuery(id);
    const is_429_error = useSelector(state => state.generalData.global_429_error);
    const favCoins = useSelector(state => state.favSlice.coins)
    const [fav,setFav] = useState(false);
    const [coinsData, setCoinData] = useState({
        description: "loading...",
        image: defaultImage,
        links: "loading...",
        localization: "loading...",
        market_cap_rank: "loading...",
        current_price: "loading...",
        changes: ['loading...']
    });

    useEffect(()=>{
        if(favCoins.includes(id)){
            setFav(true);
        }else{
            setFav(false);
        }
    },[favCoins])

    function handleFav(e) {
        e.preventDefault();
        dispatch(addFavCoin(id));
    }

    useEffect(() => {
        if (isSuccess && data) {
            const { description, image, links, localization, market_cap_rank, market_data } = data;
            const sanitizedDescription = DOMPurify.sanitize(description['en']);
            const data_updater = {
                description: sanitizedDescription,
                image: image.large || defaultImage,
                links: links.blockchain_site[0] || "N/A",
                localization: localization['en'],
                market_cap_rank,
                current_price: market_data.current_price.usd,
                changes: [
                    [market_data.price_change_percentage_24h,'24h'],
                    [market_data.price_change_percentage_7d,'7d'],
                    [market_data.price_change_percentage_14d,'14d'],
                    [market_data.price_change_percentage_30d,'30d'],
                    [market_data.price_change_percentage_60d,'60d'],
                    [market_data.price_change_percentage_200d,'200d'],
                    [market_data.price_change_percentage_1y,'1y'],
                ]
            };
            setCoinData(data_updater);
        }
        dispatch(setChartError(false));
    }, [isSuccess, data, dispatch]);

    useEffect(()=>{
        if(isError){
            if(error.status === 429){
                dispatch(handle_global_429_error(true))
            }
        }
    },[isError])

    useEffect(()=>{
        if(is_429_error){
            handleCallsLimitError()
        }
    },[is_429_error])

    return (
        <>
            <div className="coinInfoPage flex flex-col gap-10 p-8">
                <div className="coinOverview flex items-center gap-8 bg-secondary p-4 rounded-lg bg-gradient-to-br from-secondary from-30% to-darkSecondary to-70% relative">
                    <div className="nameImagePrice flex flex-col w-[20%] items-center gap-4 ">
                        <div className=" text-4xl text-main overflow-hidden text-center">{coinsData.localization}</div>
                        <img className="w-[80%] " src={coinsData.image} alt="Coin Image" />
                        <div className=" text-4xl text-main overflow-hidden">{coinsData.current_price}$</div>
                    </div>
                    <div className=" w-[80%] text-main" dangerouslySetInnerHTML={{ __html: (coinsData.description || "No desctiption available.") }}></div>
                <button className=" w-7 h-7 absolute text-center text-lg text-main top-4 right-4 overflow-hidden" onClick={(handleFav)}><i className={`fa-${fav ? 'solid' : 'regular'} fa-heart w-full h-full`}></i></button>
                </div>
                <div className="additionalData flex items-center gap-8 bg-secondary p-4 rounded-lg text-main bg-gradient-to-tl from-darkSecondary from-30% to-secondary to-70% ">
                    <div className="stats w-1/2">
                    <div className=" text-xl"><span className="capitalize">market cap rank:</span> {coinsData.market_cap_rank}</div>
                    </div>
                    <div className="links w-1/2">
                    <a href={coinsData.links} target="blank" className="">Click here to visit {coinsData.localization}`s website. </a>
                    </div>
                </div>
                <div className="changeState bg-main p-4 rounded-lg flex items-center justify-between text-xl text-secondary">
                    {coinsData.changes.map((ch, index) => (
                        <div className="flex flex-col items-center p-2 bg-secondary text-main rounded-md" key={index}>
                            <p className="changeTitle">{ch[1]}</p>
                            <p className={` ${handleColor(ch[0])} changePercentage`}>{ch[0]}%</p>
                        </div>
                    ))}
                </div>
            </div>
            <TimeSliceOptions />
            <CoinChart coinIdProp={id} />
        </>
    );
}
