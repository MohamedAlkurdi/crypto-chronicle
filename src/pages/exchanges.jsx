import { useEffect, useState } from "react";
import { useGetExchangesQuery } from "../redux/API/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { handle_global_429_error } from "../redux/generalData";
import { handleCallsLimitError } from "../modules/errorHandlers";
import SingleExchange from "../components/singleExchange";
import Heading from "../components/heading";

export default function Exchanges() {
    const { isSuccess, isError, isLoading, data, error } = useGetExchangesQuery();
    const is_429_error = useSelector(state => state.generalData.global_429_error);
    const dispatch = useDispatch();

    const [exchangesState, setExchangesState] = useState([
        {
            id: "Loading...",
            name: "Loading...",
            year_established: "Loading...",
            image: "Loading...",
            trust_rank: "Loading...",
        }
    ])

    useEffect(() => {
        if (isError) {
            if (error.status === 429) {
                dispatch(handle_global_429_error(true))
            }

        }
    }, [isError]);

    useEffect(() => {
        if (is_429_error) {
            handleCallsLimitError();
        }

    }, [is_429_error])

    useEffect(() => {
        if (isSuccess) {
            setExchangesState(data)
        }
        console.log(data);
    }, [isSuccess])

    useEffect(() => {
        console.log(exchangesState);
    }, [exchangesState])

    const renderExchanges = exchangesState.map(el => {
        const { id, name, year_established, image, trust_score_rank } = el
        return <SingleExchange
            key={id}
            exchangeData={{ id, name, year_established, image, trust_score_rank }} />
    })

    return (
        <>
            <Heading title={"exchanges page"} />
            <div className="exchangesTableLabels hover:bg-darkMainBg border-t-2 border-t-main">
                <div className="row flex justify-between items-center w-full ">
                    <div className="w-1/3 text-center p-5 text-lg text-main " >image</div>
                    <div className="w-full text-center p-5 text-lg text-main ">platform</div>
                    <div className="w-full text-center p-5 text-lg text-main ">year established</div>
                    <div className="w-full text-center p-5 text-lg text-main ">trust rank</div>
                    <div className="w-full text-center p-5 text-lg text-main ">fav stat</div>
                </div>
            </div>
            <div className="exchangesContainer flex flex-col w-full">
                {isLoading ? 'Loading...' : renderExchanges}
            </div>
        </>
    )
}