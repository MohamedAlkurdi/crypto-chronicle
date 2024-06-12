import { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import SearchBar from './components/searchBar'
import CoinPage from './pages/coinPage.jsx'
import NotFound from './pages/notFound.jsx'
import Login from './pages/login.jsx'
import SignUp from './pages/signup.jsx'
import GlobalNftsPage from './pages/globalNftsPage.jsx'
import Exchanges from './pages/exchanges'
import NftPage from './pages/nftPage.jsx'
import GlobalCoinsPage from './pages/globalCoinsPage.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home.jsx'
import FavItmes from './pages/favItems.jsx'
import ExchangePage from './pages/exchangePage.jsx'

// import { useGlobalQuery } from './redux/API/apiSlice'

function App() {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSubscribing(location.pathname === '/login' || location.pathname === '/signup');
  }, [location.pathname]);

  return (
    <div className="App w-full h-screen bg-mainBG">
      {
        isSubscribing ?
          "" :
          <>
            <Navbar />
            <SearchBar /></>
      }

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/coins" element={<GlobalCoinsPage />} />
        <Route path="/nfts" element={<GlobalNftsPage />} />
        <Route path="/fav" element={<FavItmes />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/coin/:id" element={<CoinPage />} />
        <Route path="/nft/:id" element={<NftPage />} />
        <Route path="/singleExchange/:id" element={<ExchangePage />} />
      </Routes>
    </div>
  )
}

export default App
