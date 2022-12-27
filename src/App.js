import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import localforage from 'localforage';

localforage.config();

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
export const API_URL = process.env.REACT_APP_API_URL

// Pages
const AppLayout = React.lazy(() => import('./views/AppLayout'))
const Login = React.lazy(() => import('./views/pages/login/Login'))

const Page401 = React.lazy(() => import('./views/pages/page401/Page401'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

export const AppContext = React.createContext();

const App = () => {
  const [loggedUser, setLoggedUser] = React.useState('')
  const [selImp, setSelImp] = React.useState('')

  React.useEffect(()=>{
    localforage.getItem('loggedUser').then((data)=>{
      setLoggedUser(data)
    })
    localforage.getItem('selImp').then((data)=>{
      setSelImp(data)
    })
  }, [])


  return (
    <>
    <AppContext.Provider value={{
      getLoggedUser:()=>loggedUser??false,
      login:(newLoggedUser)=>{
        if(newLoggedUser && newLoggedUser != null){
          localforage.setItem('loggedUser', newLoggedUser)
          setLoggedUser(newLoggedUser)
        }
      },
      logout:()=>{
        localforage.removeItem('loggedUser')
        localforage.removeItem('selImp')
        localforage.clear()

        setLoggedUser('')
        setSelImp('')
      },
      getSelImp:()=>selImp??false,
      setSelImp:(newSelImp)=>{
        if(newSelImp && newSelImp != null){
          localforage.setItem('selImp', newSelImp)
          setSelImp(newSelImp)
        }
      }
      }}>
      <Router>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/*" name="App" element={<AppLayout/>}/>
            <Route exact path="/login" name="Login Page" element={<Login/>}/>

            <Route exact path='/401' name="Page 401" element={<Page401/>}/>
            <Route exact path='/404' name="Page 404" element={<Page404/>}/>
            <Route exact path='/500' name="Page 500" element={<Page500/>}/>
          </Routes>
        </Suspense>
      </Router>
    </AppContext.Provider>
    </>
  )
}

export default App