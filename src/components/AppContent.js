import React, { Suspense } from 'react'
import {Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

const Home = React.lazy(() => import('../views/appContent/Home'))
const MyAccount = React.lazy(() => import('../views/appContent/MyAccount'))
const MyImpianti = React.lazy(() => import('../views/appContent/MyImpianti'))
const Dashboard = React.lazy(() => import('../views/appContent/Dashboard'))

const AppContent = () =>
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/" name="Home" element={<Home/>} />
          {/*<Route exact path="/myAcc" name="Account" element={<MyAccount/>} />
          <Route exact path="/myAcc/impianti" name="Impianti" element={<MyImpianti/>} />
          <Route exact path="/myAcc/impianti/:imp" name="Dashboard" element={<Home/>} />
          */}
          </Routes>
      </Suspense>
    </CContainer>


export default React.memo(AppContent)
