/* eslint-disable react/jsx-key */
import React from 'react'

import {InfoModal} from 'src/components/index'
import {AppContext} from 'src/App'

import {NavLink} from 'react-router-dom'

import axios from 'axios'
import { CCard, CCardBody, CFormInput, CInputGroup, CCol, CRow, CCardLink } from '@coreui/react'

import { API_URL } from 'src/App'

const MyImpianti = () =>{
  const [impianti, setImpianti] = React.useState([])
  const [requestError, setRequestError] = React.useState(false)

  const context = React.useContext(AppContext)
  React.useEffect(() => {
    axios.get(API_URL+'/myAcc/impianti',
          {headers:{'x-access-token':context.getLoggedUser()?.token}})
          .then((res)=>{
            console.log(res.data);
            setImpianti(res.data)
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
      {
        impianti.map( item =>
        <CCol xs md={6}>
          <CCard >
          <CCardBody>
            {
            Object.keys(item).map(key => 
              <CInputGroup className="mb-3">
                <CFormInput disabled value={key}></CFormInput>
                <CFormInput aria-disabled value={item[key]}></CFormInput>
              </CInputGroup>        
              )
            }
            <CCardLink to='/myImpianti/dashboard' component={NavLink}>
              Go to Dashboard
            </CCardLink>
          </CCardBody>
        </CCard>
        </CCol>
        )
      }
    </CRow>
    </>
  )
}


export default MyImpianti
