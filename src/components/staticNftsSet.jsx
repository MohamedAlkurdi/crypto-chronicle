import staticNftsData from "../staticNftsData.json"
import SingleNftDataDisplayer from "./singleNftDataDisplayer"

export default function StaticNftSet(){

    const renderNFTS = staticNftsData.map(el=>{
        return <SingleNftDataDisplayer componentState={el} key={el.id}/>
    })
    return(
        <div className="grid grid-cols-3 gap-x-6 gap-y-10 w-full bg-mainBG">
        {renderNFTS}
        </div>
    )
}