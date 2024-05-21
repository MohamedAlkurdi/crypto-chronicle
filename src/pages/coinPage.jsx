// import { useEffect, useState } from "react"
// import { useLocation, useParams } from "react-router-dom"
// import { useGetCoinByIdQuery } from "../redux/API/apiSlice"
// import defaultImage from '../assets/_d7457e79-4a4f-49eb-831c-99a1ff31f82f.jpg'
// import CoinChart from "../components/coinChart"
// import TimeSliceOptions from "../components/timeSliceOptions"
// import { useDispatch } from "react-redux"
// import { setChartError } from "../redux/chartSlice"
// import DOMPurify from "dompurify"

// export default function CoinPage() {
//     const id = useParams().id.substring(1);
//     const dispatch = useDispatch();
//     const location = useLocation()
//     const {isSuccess, data} = useGetCoinByIdQuery(id);
//     const [coinsData, setCoinData] = useState({
//         description: "loading...",
//         image: "loading...",
//         links: "loading...",
//         localization: "loading...",
//         market_cap_rank: "loading...",
//         current_price: "loading...",
//         changes:['loading...']
//     })

//     useEffect(() => {
//         if (isSuccess && data) {
//             const { description, image, links, localization, market_cap_rank, market_data } = data;
//             const sanitizedDescription = DOMPurify.sanitize(description['en']);
//             const data_updater = {
//                 description: sanitizedDescription,
//                 image: image.large || defaultImage,
//                 links: links.blockchain_site[0] || "N/A",
//                 localization: localization['en'],
//                 market_cap_rank,
//                 current_price: market_data.current_price.usd,
//                 changes: [
//                     market_data.price_change_percentage_24h,
//                     market_data.price_change_percentage_7d,
//                     market_data.price_change_percentage_14d,
//                     market_data.price_change_percentage_30d,
//                     market_data.price_change_percentage_60d,
//                     market_data.price_change_percentage_200d,
//                     market_data.price_change_percentage_1y,
//                 ]
//             };
//             setCoinData(data_updater);
//         }
//         dispatch(setChartError(false));
//     }, [data])

//     // useEffect(()=>{
//     //     console.log("coin page location info",location)
//     // },[])

//     useEffect(() => {
//         console.log("fetched coin by id:", data)
//     }, [data])

//     return (
//         <>
//             <div className="coinInfoDisplayer">{coinsData.localization}</div>
//             <img src={coinsData.image} alt="" />
//             <div className="coinInfoDisplayer">{coinsData.current_price}$</div>
//             <div className="coinInfoDisplayer">{`${coinsData.description}`}</div>
//             <p>additional data:</p>
//             <div className="coinInfoDisplayer">{coinsData.market_cap_rank}</div>
//             <a href={coinsData.links} className="coinInfoDisplayer">website</a>
//             <p>change stats:</p>
//             {coinsData.changes.map((ch, index) => (
//                 <div key={index}>{ch}</div>
//             ))}
//             <TimeSliceOptions />
//             <CoinChart coinIdProp={id} />
//         </>
//     )
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCoinByIdQuery } from "../redux/API/apiSlice";
import defaultImage from '../assets/_d7457e79-4a4f-49eb-831c-99a1ff31f82f.jpg';
import CoinChart from "../components/coinChart";
import TimeSliceOptions from "../components/timeSliceOptions";
import { useDispatch } from "react-redux";
import { setChartError } from "../redux/chartSlice";
import DOMPurify from 'dompurify';

export default function CoinPage() {
    const id = useParams().id.substring(1);
    const dispatch = useDispatch();
    const { data, isSuccess } = useGetCoinByIdQuery(id);
    const [coinsData, setCoinData] = useState({
        description: "loading...",
        image: defaultImage,
        links: "loading...",
        localization: "loading...",
        market_cap_rank: "loading...",
        current_price: "loading...",
        changes: ['loading...']
    });
    
    function handleColor(input){
        if(parseFloat(input) < 0){
            return 'text-red-300'
        }
        return 'text green-300'
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

    useEffect(() => {
        console.log("fetched coin by id:", data);
    }, [data]);

    return (
        <>
            <div className="coinInfoPage flex flex-col gap-10 p-8">
                <div className="coinOverview flex items-center gap-8 bg-secondary p-4 rounded-lg">
                    <div className="nameImagePrice flex flex-col w-[20%] items-center gap-4 ">
                        <div className=" text-4xl text-main overflow-hidden text-center">{coinsData.localization}</div>
                        <img className="w-[80%] " src={coinsData.image} alt="Coin Image" />
                        <div className=" text-4xl text-main overflow-hidden">{coinsData.current_price}$</div>
                    </div>
                    <div className=" w-[80%] text-main" dangerouslySetInnerHTML={{ __html: (coinsData.description || "No desctiption available.") }}></div>
                </div>
                <div className="additionalData flex items-center gap-8 bg-secondary p-4 rounded-lg ">
                    <div className=" text-xl text-main"><span className="capitalize">market cap rank:</span> {coinsData.market_cap_rank}</div>
                    <a href={coinsData.links} className="">website</a>
                </div>
                <div className="changeState bg-secondary p-4 rounded-lg flex items-center justify-between text-xl text-main">
                    {coinsData.changes.map((ch, index) => (
                        <div className="flex flex-col items-center p-2 bg-lightMain text-secondary rounded-md" key={index}>
                            <p className="changeTitle">{ch[1]}</p>
                            <p className={` ${handleColor(ch[0])} changePercentage`}>{ch[0]}</p>
                        </div>
                    ))}
                </div>
            </div>
            <TimeSliceOptions />
            <CoinChart coinIdProp={id} />
        </>
    );
}
