import { useEffect } from "react";
import defaultImage from '../assets/pexels-davidmcbee-730564.jpg';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavNft } from "../redux/favSlice";

export default function FavNft({ FavNftData }) {
    const { id, name, image } = FavNftData;
    const favNfts = useSelector(state => state.favSlice.nfts);
    const dispatch = useDispatch();

    const isFav = favNfts.some(el => el.id === id);

    function handleFav(e) {
        e.preventDefault();
        dispatch(addFavNft({ id, name, image }));
    }

    return (
        <NavLink to={`/nft/:${id}`} className="favNft w-full hover:bg-darkMainBg border-t-2 border-t-main">
            <div className="row flex justify-between items-center w-full ">
                <img className="w-1/6 h-[150px] object-cover object-center" src={image || defaultImage} alt="favNftImage" />
                <div className="w-full text-center p-5 text-lg text-main ">{name}</div>
                <button className="w-1/6 text-center p-5 text-lg text-main" onClick={handleFav}>
                    <i className={`fa-${isFav ? 'solid' : 'regular'} fa-heart`}></i>
                </button>
            </div>
        </NavLink>
    );
}
