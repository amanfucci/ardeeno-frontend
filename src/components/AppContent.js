import React, { Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import {
  CContainer,
  CSpinner
} from '@coreui/react'

const Home = React.lazy(() => import('../views/appContent/Home'))
const MyAccount = React.lazy(() => import('../views/appContent/MyAccount'))
const MyImpianti = React.lazy(() => import('../views/appContent/MyImpianti'))
const Dashboard = React.lazy(() => import('../views/appContent/Dashboard'))
const Heatmap = React.lazy(() => import('../views/appContent/Heatmap'))
//const Misurazioni = React.lazy(() => import('../views/appContent/Misurazioni'))


const AppContent = () =>
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route exact path="/" name="Home" element={<Navigate replace to="/home" />}/>
          <Route exact path="/home" name="Home" element={<Home/>} />
          <Route exact path="/myAccount" name="Account" element={<MyAccount/>} />
          <Route exact path="/myImpianti" element={<Navigate replace to="/myImpianti/list" />} />
          <Route exact path="/myImpianti/list" name="Impianti" element={<MyImpianti/>} />
          <Route exact path="/myImpianti/dashboard" name="Dashboard" element={<Dashboard/>} />
          <Route exact path="/myImpianti/heatmap" name="Heatmap" element={<Heatmap/>} />
          {/*<Route exact path="/myImpianti/misurazioni" name="Misurazioni" element={<Misurazioni/>} />*/}

          <Route path="/*" element={<Navigate replace to="/404" />} />
        </Routes>
      </Suspense>
    </CContainer>


export default React.memo(AppContent)
