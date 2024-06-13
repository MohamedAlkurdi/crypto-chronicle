import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavNft } from "../redux/favSlice";

export default function SingleNftDataDisplayer({ componentState }) {
    const favNfts = useSelector((state) => state.favSlice.nfts);
    const [fav, setFav] = useState(false);
    const dispatch = useDispatch();
    const { id, image, name, price, description, homepage } = componentState;

    function shortenText(text = "Loading...") {
        if (text.length > 170) {
            return text.slice(0, 160) + "...(click for more details)";
        }
        return text;
    }

    useEffect(() => {
        const isFav = favNfts.some((el) => el.id === id);
        setFav(isFav);
    }, [favNfts]);

    function handleFav(e) {
        e.preventDefault();
        dispatch(addFavNft({ id, name, image }));
    }

    return (
        <div className="singleNftsInfo bg-mainBG overflow-y-hidden hover:bg-darkMainBg h-auto border-t-2 border-t-main p-4 ">
            <div className="nftBox flex flex-col justify-between w-full items-center relative">
                <NavLink to={`/nft/${id}`} className="block w-full">
                    <div className="upperPart flex w-full min-h-[150px] items-center gap-4 mb-5">
                        <img
                            className="object-cover object-center h-[170px] min-w-[170px]"
                            src={image}
                            alt={`${name} NFT`}
                        />
                        <div className="nameAndPrice flex flex-col gap-3">
                            <p className="name text-2xl capitalize">{name}</p>
                            <p className="price">{price}$</p>
                        </div>
                    </div>
                    <div className="info flex flex-col w-full gap-4">
                        <div className="description h-[120px]">{shortenText(description)}</div>
                    </div>
                </NavLink>
                <button
                    className="text-center text-lg text-main absolute top-1 right-1 w-8 h-5 flex items-center justify-center"
                    onClick={handleFav}
                    aria-label={fav ? "Remove from favorites" : "Add to favorites"}
                >
                    <i className={`fa-${fav ? "solid" : "regular"} fa-heart w-full`}></i>
                </button>
            </div>
        </div>
    );
}
