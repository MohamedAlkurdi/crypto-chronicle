import { NavLink } from "react-router-dom";

export default function Server_404(){
    return(
        <div className="server_404_page w-full pageHeight flex flex-col items-center justify-center">
            <div className="redirect flex flex-col justify-center items-center gap-6">
                <h1 className="text-6xl overflow-hidden text-main h-24">This page is not supported.</h1>
                <NavLink className="text-xl text-darkSecondary" to={"/"}>Back to home?</NavLink>
            </div>
        </div>
    )
}