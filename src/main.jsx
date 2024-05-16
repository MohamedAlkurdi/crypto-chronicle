import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './redux/store.js' 
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
// import { themeContetx } from './contexts/themeContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/login'/>
      <Route path='/signup'/>
      <Route path='/home'/>
      <Route path='/coins'/>
      <Route path='/nfts'/>
      <Route path='/exchanges'/>
      <Route path='/coin/:id'/>
      <Route path='/nft/:id'/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>
)
