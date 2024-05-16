import { useEffect } from 'react'
// import { useGlobalQuery } from './redux/API/apiSlice'

function App() {
  // const global = useGlobalQuery()

  useEffect(()=>{
    // console.log("hook test:",global.data.coins);
  })
  return (
    <div className="App w-full h-40">
      <nav className='w-full h-12 bg-black'></nav>
      <div className="body w-full h-12 bg-black"></div>
      <footer className='w-full h-12 bg-black'></footer>
    </div>
  )
}

export default App
