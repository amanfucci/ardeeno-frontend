/* eslint-disable react/jsx-key */
import React from 'react'

import {ActionModal} from 'src/components/index'
import {AppContext} from 'src/App'
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
import { CCard, CCardBody, CFormInput, CInputGroup, CCol, CRow } from '@coreui/react'
import { API_URL } from 'src/App'

const MyAccount = () =>{
  const [userData, setUserData] = React.useState({})
  const [reqErrAction, setReqErrAction] = React.useState(false)

  const navigate = useNavigate()
  const context = React.useContext(AppContext)

  React.useEffect(() => {
    console.log('GET /myAcc')
    axios.get(API_URL+'/myAcc',
          {headers:{'x-access-token':context.getLoggedUser()?.token}})
          .then((res)=>{
            console.log(res.data);
            setUserData(res.data)
          })
          .catch((err)=>{
            console.log('Houston, we have an error: ' + err + '. See below for more info')
            console.log(err)
            setReqErrAction(true)//show pop-up window
          })
  }, []);

  return(
  <>
  {!context.getLoggedUser() ? navigate('/401') : ''}
  {reqErrAction ?
  <ActionModal
    title='Request Error!'
    body='See the console for more information'
    onClose={setReqErrAction.bind(false)}
    /> : ''}
  
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
