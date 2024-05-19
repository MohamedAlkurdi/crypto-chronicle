import { useEffect } from 'react'
import Navbar from './components/navbar'
import SearchBar from './components/searchBar'
import Banner from './components/banner'
import Coins from './components/coins'
import ImageSlider from './components/carouselTest'
import img1 from "./assets/_52b6b019-af38-4bd4-b148-405628d2815b.jpg"
import img2 from "./assets/_d7457e79-4a4f-49eb-831c-99a1ff31f82f.jpg"
import img3 from "./assets/pexels-alesiakozik-6780789.jpg"
import img4 from "./assets/pexels-davidmcbee-730564.jpg"
import img5 from "./assets/pierre-borthiry-peiobty-vBCVcWUyvyM-unsplash.jpg"
import img6 from "./assets/bannerImage.png"

// import { useGlobalQuery } from './redux/API/apiSlice'

function App() {
  // const global = useGlobalQuery()
  const slides = [
    { url: img6, title: "italy" },
    { url: img1, title: "beach" },
    { url: img2, title: "boat" },
    { url: img3, title: "forest" },
    { url: img4, title: "city" },
    { url: img5, title: "italy" },

  ];

  useEffect(()=>{
    // console.log("hook test:",global.data.coins);
  })

  return (
    <div className="App w-full h-screen bg-mainBG">
      <Navbar/>
      <SearchBar/>
      {/* <Banner/> */}
      <ImageSlider images={slides} />
      <Coins/>
      </div>
  )
}

export default App
