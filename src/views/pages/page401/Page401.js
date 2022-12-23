import React from 'react'
import {
  CCol,
  CContainer,
  CNavLink,
  CRow,
} from '@coreui/react'
import {NavLink} from 'react-router-dom'

const Page401 = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">401</h1>
              <h4 className="pt-3">Please, login first!</h4>
              <p className="text-medium-emphasis float-start">
                You cannot access that page without first logging in!
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

export default Page401
