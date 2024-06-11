import { NavLink } from "react-router-dom";

export default function SingleSearchOutput({routeInfo}){
    const {route,id} = routeInfo;

    return(
        <NavLink target="blank" className='bg-secondary px-2 py-1 rounded-lg text-main' to={`/${route}/:${id}`}>
            {id}
        </NavLink>
    )
}