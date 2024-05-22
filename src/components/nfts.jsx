import { useEffect, useState } from "react";
import { useGetNftListQuery } from "../redux/API/apiSlice";
import NftInfo from "./nftInfo";

export default function Nfts() {
    const { data, isSuccess, isError, isLoading } = useGetNftListQuery();
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
            console.log("updaterObject",updaterObject)
        }
    }, [isSuccess])

    const renderTheNFTS = renderedNFTS.map(el=>{
        if(el !== "Loading..."){
        return <NftInfo key={el} id={el}/>
    }
    })

    return (
        <div className="nftsInfoContainer flex flex-col  my-40">
            <div className="nftInfo flex justify-between items-center ">
                <div className="grid grid-cols-3 gap-x-6 gap-y-10 w-full">
                    {/* <div className="bg-main p-4 h-40 hover:shadow-lg ">
                    </div>
                    <div className="bg-main p-4 h-40 hover:shadow-lg">
                    </div>
                    <div className="bg-main p-4 h-40 hover:shadow-lg">
                    </div>
                    <div className="bg-main p-4 h-40 hover:shadow-lg">
                    </div>
                    <div className="bg-main p-4 h-40 hover:shadow-lg">
                    </div>
                    <div className="bg-main p-4 h-40 hover:shadow-lg">
                    </div> */}
                    {renderTheNFTS}
                </div>
            </div>
        </div>
    )
}

