import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './redux/store.js'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App/>}>
//       <Route path='/*' element={<NotFound/>}/>
//       <Route path='/login' element={<Login/>}/>
//       <Route path='/signup' element={<SignUp/>}/>
//       <Route path='/coins' element={<GlobalCoinsPage/>}/>
//       <Route path='/nfts' element={<GlocalNftsPage/>}/>
//       <Route path='/exchanges' element={<Exchanges/>}/>
//       <Route path='/coin/:id' element={<CoinPage/>}/>
//       <Route path='/nft/:id' element={<NftPage/>}/>
//     </Route>
//   )
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
