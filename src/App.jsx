import { useEffect } from 'react'
import Navbar from './components/navbar'
import SearchBar from './components/searchBar'
import Banner from './components/banner'
// import { useGlobalQuery } from './redux/API/apiSlice'

function App() {
  // const global = useGlobalQuery()

  useEffect(()=>{
    // console.log("hook test:",global.data.coins);
  })

  return (
    <div className="App w-full h-screen bg-mainBG">
      <Navbar/>
      <SearchBar/>
      <Banner/>
      {/* <nav className='w-full h-[10vh]  bg-main text-5xl text-secondary'>
      test           test           test           test           test           
      </nav>
      <div className="body w-full h-[75vh] bg-mainBG "></div>
      <footer className='w-full h-[15vh] bg-main'></footer> */}
    </div>
  )
}

export default App
