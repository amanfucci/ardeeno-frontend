/* eslint-disable react-hooks/rules-of-hooks */
import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {StoreManager} from "react-persistent-store-manager";
import './scss/style.scss'

import { Stores, AppStore } from "./state/store";
import axios from 'axios';

const Store = StoreManager(AppStore, Stores, "loggedUser");

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
export const API_URL = process.env.REACT_APP_API_URL

// Pages
const AppLayout = React.lazy(() => import('./layout/AppLayout'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const WikiLayout = React.lazy(() => import('./layout/WikiLayout'))

export const AppContext = React.createContext();

const App = () => {
  const [token, setToken] = React.useState(null)
  const [email, setEmail] = React.useState(null)
  const [_id, set_id] = React.useState(null)
  const [ruolo, setRuolo] = React.useState(null)

  Store.useStateAsync('token').then(val => {
    val && setToken(val) && axios.get('localhost:8080/')
  })
  Store.useStateAsync('email').then(val => {
    val && setEmail(val)
  })
  Store.useStateAsync('_id').then(val => {
    val && set_id(val)
  })
  Store.useStateAsync('ruolo').then(val => {
    val && setRuolo(val)
  })

  //Check token validity
  return (
    <>
    <AppContext.Provider value={{
      getLoggedUser:()=> (
        token && {
          'token':token, 
          'email':email, 
          '_id':_id,
          'ruolo':ruolo
        }
      ),
      login:(newLoggedUser)=>{
        Store.update('token', newLoggedUser.token); setToken(newLoggedUser.token);
        Store.update('email', newLoggedUser.email); setEmail(newLoggedUser.email);
        Store.update('_id', newLoggedUser._id); set_id(newLoggedUser._id);
        Store.update('ruolo', newLoggedUser.ruolo); setRuolo(newLoggedUser.ruolo);
      },
      logout:()=>{
        Store.update('token', null); setToken(null);
        Store.update('email', null); setEmail(null);
        Store.update('_id', null); set_id(null);
        Store.update('ruolo', null); setRuolo(null);
      }
      }}>
      <Router>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/*" name="App" element={<AppLayout/>}/>
            <Route exact path="/login" name="Login Page" element={<Login/>}/>
            <Route exact path="/register" name="Register Page" element={<Register />}/>

            <Route exact path='/404' name="Page 404" element={<Page404/>}/>
            <Route exact path='/500' name="Page 500" element={<Page500/>}/>

            <Route path="/wiki/*" name="Wiki" element={<WikiLayout/>}/>
          </Routes>
        </Suspense>
      </Router>
    </AppContext.Provider>
    </>
  )
}

export default App