import { useState } from "react"
import { NavLink } from "react-router-dom"
import SearchComponent from "./searchComponent"

export default function SearchBar() {
    const [theme, setTheme] = useState('moon')
    const [searchComponentVisibility, setSearchComponentVisibility] = useState(false)

    function closeSearchComponent(){
        setSearchComponentVisibility(false)
    }
    function handleSearchBarClick(){
        console.log("handleSearchBarClick")
        setSearchComponentVisibility(true);
    }

    return (
        <div className="searchBar flex items-center justify-between py-4 px-6 custom_box_shadow ">
            <div className="searchInputContainer flex-1">
                <div
                    onClick={handleSearchBarClick}
                    className="seachInput cursor-pointer w-[80%] h-[44px] text-xl p-2 rounded-lg bg-main placeholder:text-secondary text-secondary focus:outline-none">
                    Search...
                </div>
            </div>
            <div className="preferencesContaienr flex items-center justify-between w-1/3">
                <select className="text-xl p-2 rounded-lg bg-main text-secondary focus:outline-none h-[44px] text-xl" name="vsCurrency" id="">
                    <option value="usd">usd</option>
                    <option value="eur">eur</option>
                    <option value="tr">tr</option>
                </select>
                <button>
                    <i className={`fa-solid fa-${theme} p-2 rounded-lg bg-main text-secondary text-xl w-[44px] h-[44px] flex items-center justify-center`}></i>
                </button>
                <NavLink className='p-2 rounded-lg bg-main text-secondary h-[44px] flex items-center justify-center text-xl capitalize' to='/fav'>fav elements</NavLink>
            </div>
            {searchComponentVisibility ? <SearchComponent close={closeSearchComponent}/> : ""}
        </div>
    )
}