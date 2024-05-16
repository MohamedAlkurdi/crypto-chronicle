import { useEffect } from 'react'
import './App.css'
// import { useGetCoinsListQuery } from './redux/API/apiSlice'
import { useGlobalQuery } from './redux/API/apiSlice'
// import { useGetCoinHistoryQuery } from './redux/API/apiSlice'


function App() {

  // const getAllCoinHook = useGetCoinsListQuery()
  const global = useGlobalQuery()
  // const coinHistory = useGetCoinHistoryQuery();


  useEffect(()=>{
    console.log("hook test:",global.data.coins);
  })
  return (
    <>
    <h1>test</h1>
    </>
  )
}

export default App
