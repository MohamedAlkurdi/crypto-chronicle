import { NavLink } from "react-router-dom"
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavNft } from "../redux/favSlice";

export default function SingleNftDataDisplayer({ componentState }){
    const selector = useSelector(state => state.favSlice.nfts)
    const [fav,setFav] = useState(false);
    const dispatch = useDispatch();

    
    function shortenText(text = 'Loading...') {
        if (text.length > 170) {
            return text.slice(0, 160) + '...(click for more details)';
        }
        return text;
    }

    useEffect(()=>{
        if(selector.includes(id)){
            setFav(true);
        }
    },[selector])

    function handleFav(e) {
        e.preventDefault();
        dispatch(addFavNft(id));
    }

    function handleLinkClick(e){
        e.preventDefault()
        e.stopPropagation()
    }
    const {id,image,name,price,description,homepage} = componentState;
    return (
        <NavLink to={`/nft/:${id}`} className="coinInfo  hover:bg-darkMainBg h-auto border-t-2 border-t-main p-4 ">
            <div className="nftBox flex flex-col justify-between w-full items-center relative">
                <div className="upperPart flex w-full min-h-[150px] items-center gap-4 mb-5">
                <img className=" object-cover object-center h-[170px] min-w-[170px]" src={image} alt="nft"/>
                <div className="nameAndPrice flex flex-col gap-3">
                <p className="name text-2xl capitalize">{name}</p>
                <p className="price">{price}$</p>
                </div>
                </div>
                <div className="info flex flex-col w-full gap-4 ">
                    <div className="description h-[120px]">{shortenText(description)}</div>
                    <a onClick={handleLinkClick} href={homepage} target="_blank">home page</a>
                </div>
                <button className="text-center text-lg text-main absolute top-1 right-1  w-8 h-5 flex items-center justify-center" onClick={(handleFav)}><i className={`fa-${fav?'solid':'regular'} fa-heart w-full`}></i></button>
            </div>
        </NavLink>
    )
}