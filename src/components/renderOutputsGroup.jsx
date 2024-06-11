import { useSelector } from "react-redux"
import SingleSearchOutput from "./singleSearchOutput"

export default function RenderOutputsGroup({outputsData}){
    const {outputsArray,type} = outputsData
    const searching = useSelector(state => state.searchSlice.searching)
    

    const outputs = outputsArray?.map(el => {
        return <SingleSearchOutput key={el.id} routeInfo={{ route: type, id: el.id }} />
    })

    return(
        <>
            {
                searching ? "Loading..." :
                    <div className="flex flex-col gap-[2px]">
                        {outputs.length === 0 ? <span className="text-secondary">No match.</span> : outputs}
                    </div>
            }
        </>
    )
}