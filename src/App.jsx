import { useEffect } from 'react'
import Navbar from './components/navbar'
import SearchBar from './components/searchBar'
import CoinPage from './pages/coinPage.jsx'
import NotFound from './pages/notFound.jsx'
import Login from './pages/login.jsx'
import SignUp from './pages/signup.jsx'
import GlobalNftsPage from './pages/globalNftsPage.jsx'
import Exchanges from './pages/exchanges.jsx'
import NftPage from './pages/nftPage.jsx'
import GlobalCoinsPage from './pages/globalCoinsPage.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home.jsx'

// import { useGlobalQuery } from './redux/API/apiSlice'

function App() {
  // const global = useGlobalQuery()


  useEffect(() => {
    // console.log("hook test:",global.data.coins);
  })

  return (
    <div className="App w-full h-screen bg-mainBG">
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/coins" element={<GlobalCoinsPage />} />
        <Route path="/nfts" element={<GlobalNftsPage />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/coin/:id" element={<CoinPage />} />
        <Route path="/nft/:id" element={<NftPage />} />
      </Routes>
    </div>
  )
}

export default App
