import React, { Suspense } from 'react'
import {Route, Routes, Navigate } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

const Home = React.lazy(() => import('../views/appContent/Home'))
const MyAccount = React.lazy(() => import('../views/appContent/MyAccount'))
const MyImpianti = React.lazy(() => import('../views/appContent/MyImpianti'))
const Dashboard = React.lazy(() => import('../views/appContent/Dashboard'))

const AppContent = () =>
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route exact path="/" name="Home" element={<Navigate replace to="/home" />}/>
          <Route exact path="/home" name="Home" element={<Home/>} />
          <Route exact path="/myAccount" name="Account" element={<MyAccount/>} />
          <Route exact path="/myImpianti" name="Impianti" element={<MyImpianti/>} />
           {/*<Route exact path="/myImpianti/dashboard" name="Dashboard" element={<Home/>} />
          */}
          <Route path="/*" element={<Navigate replace to="/404" />} />
        </Routes>
      </Suspense>
    </CContainer>


export default React.memo(AppContent)
