import Coins from "../components/coins";
import Heading from "../components/heading";

export default function GlobalCoinsPage(){
    return(
        <div className="coinsPage">
            <Heading title={"coins page"} />
            <Coins/>
        </div>
    )
}