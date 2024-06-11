import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../redux/searchSlice";
import { handleCallsLimitError } from "../modules/errorHandlers";
import SearchOutput from "./searchOutput";

export default function SearchComponent({ close }) {
    const dispatch = useDispatch()
    const [searchInput,setSearchInput] = useState("");
    const error = useSelector(state=>state.searchSlice.error)

    function closeComponent(e) {
        const out = e.target.classList[0];
        if (out === "searchComponentContainer" || out === "closeButton") close();
    }

    function handleTextChange(e){
        setSearchInput(e.target.value)
    }

    function triggerSearch(){
        dispatch(search(searchInput))
    }

    useEffect(()=>{
        if(error){
            handleCallsLimitError();
        }
    },[error])

    return (
        <div
            onClick={closeComponent}
            className="searchComponentContainer w-[100vw] h-[100vh] bg-opacity-50 bg-black fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
            <div className="relative w-[90vw] h-[90vh] z-50 overflow-visible bg-main rounded-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-9">
                <div className="searchBar w-full flex">
                    <input type="text"
                    value={searchInput}
                    onChange={handleTextChange}
                        placeholder="Enter search input..."
                        className="min-w-[75%] focus:outline-none p-2 rounded-tl-lg rounded-bl-lg text-xl text-main" />
                    <button 
                    onClick={triggerSearch}
                    className="w-full p-2 text-xl bg-secondary rounded-tr-lg rounded-br-lg capitalize text-main">submit</button>
                </div>
            <SearchOutput/>
                <button
                    onClick={closeComponent}
                    className="closeButton absolute top-[-15px] right-[-15px] bg-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] text-xl">X</button>
            </div>
        </div>
    )
}