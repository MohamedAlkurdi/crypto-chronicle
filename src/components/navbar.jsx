import { NavLink } from "react-router-dom"

export default function Navbar() {
    return (
        <div className="navbar flex items-center justify-between w-full px-12 py-5 bg-main">
            <NavLink to='/' className='capitalize text-secondary text-3xl'>crypto chronicle</NavLink>
            <NavLink className='capitalize cursor-pointer p-2 duration-200 hover:bg-lightMain  rounded-lg text-secondary text-xl' to='/coins'>coins</NavLink>
            <NavLink className='capitalize cursor-pointer p-2 duration-200 hover:bg-lightMain rounded-lg text-secondary text-xl' to='/nfts'>NFTs</NavLink>
            <NavLink className='capitalize cursor-pointer p-2 duration-200 hover:bg-lightMain rounded-lg text-secondary text-xl' to='/exchanges'>exchanges</NavLink>
            <div className="authBtns flex gap-4">
                <NavLink className='capitalize cursor-pointer p-2 duration-200 hover:bg-lightSecondary bg-secondary rounded-lg text-main text-xl' to='/login'>login</NavLink>
                <NavLink className='capitalize cursor-pointer p-2 duration-200 hover:bg-lightSecondary bg-secondary rounded-lg text-main text-xl' to='/signin'>register</NavLink>
            </div>
        </div>
    )
}