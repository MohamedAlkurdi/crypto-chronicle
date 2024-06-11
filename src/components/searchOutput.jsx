import { useSelector } from "react-redux";
import RenderOutputsGroup from "./renderOutputsGroup";

export default function SearchOutput() {
    const { coins, nfts, exchanges } = useSelector(state => state.searchSlice.output);

    return (
        <div className="p-4">
        <h1 className="text-white text-3xl capitalize my-2">coins:</h1>
        <RenderOutputsGroup outputsData={{outputsArray:coins,type:"coin"}}/>
        <h1 className="text-white text-3xl capitalize my-2">nfts:</h1>
        <RenderOutputsGroup outputsData={{outputsArray:nfts,type:"nft"}}/>
        <h1 className="text-white text-3xl capitalize my-2">exchanges:</h1>
        <RenderOutputsGroup outputsData={{outputsArray:exchanges,type:"singleExchange"}}/>
        </div>
    )
}