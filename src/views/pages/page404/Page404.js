import React from 'react'
import {
  CCol,
  CContainer,
  CNavLink,
  CRow,
} from '@coreui/react'
import {NavLink} from 'react-router-dom'

const Page404 = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
              <p className="text-medium-emphasis float-start">
                The page you are looking for was not found.
              </p>
            </div>
          </CCol>

        </CRow>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CNavLink to='/' component={NavLink}>
            Go back Home
            </CNavLink>
          </CCol>          
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
