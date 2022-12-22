/* eslint-disable react/jsx-key */
import React from 'react'

import {InfoModal} from 'src/components/index'
import {AppContext} from 'src/App'

import axios from 'axios'
import { applyMiddleware } from 'redux'
import { CCard, CCardBody, CFormInput, CInputGroup, CCol, CRow } from '@coreui/react'
import { API_URL } from 'src/App'

const MyAccount = () =>{
  const [userData, setUserData] = React.useState({})
  const [requestError, setRequestError] = React.useState(false)

  const context = React.useContext(AppContext)

  React.useEffect(() => {
    axios.get(API_URL+'/myAcc',
          {headers:{'x-access-token':context.getLoggedUser()?.token}})
          .then((res)=>{
            console.log(res.data);
            setUserData(res.data)
          })
          .catch((err)=>{
            console.log('Houston, we have an error: ' + err + '. See below for more info')
            console.log(err)
            setRequestError(true)//show pop-up window
          })
  }, []);

  return(
  <>
  {requestError ? <InfoModal title='Request Error!' body='See the console for more information'/> : ''}
  <CRow>
    <CCol xs md={6}>
      <CCard >
      <CCardBody>
        {
        Object.keys(userData).map(key => 
          <CInputGroup className="mb-3">
            <CFormInput disabled value={key}></CFormInput>
            <CFormInput aria-disabled value={userData[key]}></CFormInput>
          </CInputGroup>        
          )
        }
      </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  </>
  )
}


export default MyAccount
