import { NavLink } from "react-router-dom"
import coinGeckoLogo from '../assets/coinGeckoLogo.png'

export default function Footer() {

    const services = [
        'coins', 'nfts', 'exchanges', 'fav', 'login', 'signup',
    ]

    const renderServices = services.map(el => {
        return <NavLink className='text-center capitalize font-light py-2 text-secondary' key={el} to={`/${el}`}>{el}</NavLink>
    })

    return (
        <div className="footer w-full bg-main p-10 flex flex-col mt-24">
            <div className="servicesAndMedia flex mb-12">
                <div className="services flex flex-col justify-between w-2/3">
                    <h1 className="text-xl capitalize text-mainBG">services:</h1>
                    <div className="servicesList grid grid-cols-3">
                        {renderServices}
                    </div>
                </div>
                <div className="media w-1/3 flex flex-col justify-between ">
                    <h1 className="text-xl capitalize text-mainBG">media:</h1>
                    <div className="mediaLinksList flex items-center justify-evenly flex-wrap">
                        <a className="text-secondary text-5xl" target='blank' href="https://www.facebook.com/profile.php?id=100012475842352"><i className="fa-brands fa-square-facebook"></i></a>
                        <a className="text-secondary text-5xl" target='blank' href="https://twitter.com/muhammed_he"><i className="fa-brands fa-square-twitter"></i></a>
                        <a className="text-secondary text-5xl" target='blank' href="https://www.instagram.com/muhammed.alkurdi.he/"><i className="fa-brands fa-instagram"></i></a>
                        <a className="text-secondary text-5xl" target='blank' href="https://www.linkedin.com/in/mohamed-alkurdi-5b97b3243/"><i className="fa-brands fa-linkedin"></i></a>
                        <a className="text-secondary text-5xl" target='blank' href="https://github.com/MohamedAlkurdi?tab=repositories"><i className="fa-brands fa-square-github"></i></a>
                    </div>
                </div>
            </div>
            <div className="credit flex items-center justify-around mb-10">
                <p className="caption text-2xl w-1/2 text-mainBG">This applications backend services where provided by <a href="https://docs.coingecko.com/v3.0.1/reference/crypto-global">CoinGecko API</a>.</p>
                <div className="logos flex items-center justify-end gap-10 w-1/2">
                    <NavLink to='/' target="blank" className='capitalize text-secondary text-2xl'>crypto chronicle</NavLink>
                    <a target="blank" href="https://docs.coingecko.com/v3.0.1/reference/crypto-global"><img className="rounded-[50%] w-20" src={coinGeckoLogo} alt="coinGeckoLogo" /></a>
                </div>
            </div>
            <hr className="h-[2px] w-full bg-secondary mb-4" />
            <div className="copyRights flex w-full justify-between items-center text-lg text-mainBG">
                <p>&reg; all rights reserved for the developer 
                <a target='blank' href="https://github.com/MohamedAlkurdi?tab=repositories"> Mohamed Alkurdi</a>
                .</p>
                <p>v1.0.0</p>
            </div>
        </div>
    )
}