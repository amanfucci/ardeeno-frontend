/* eslint-disable react/jsx-key */
import React from 'react'

import {ActionModal} from 'src/components/index'
import {AppContext} from 'src/App'
import { useNavigate } from 'react-router-dom';

import {NavLink} from 'react-router-dom'

import axios from 'axios'
import { CCard, CCardBody, CFormInput, CInputGroup, CCol, CRow, CCardLink } from '@coreui/react'

import { API_URL } from 'src/App'

const MyImpianti = () =>{
  const [impianti, setImpianti] = React.useState([])
  const [reqErrAction, setReqErrAction] = React.useState(false)
  const [reqErrMessage, setReqErrMessage] = React.useState(false)

  const navigate = useNavigate()
  const context = React.useContext(AppContext)
  
  React.useEffect(() => {
    console.log('GET /myAcc/impianti')
    axios.get(API_URL+'/myAcc/impianti',
          {headers:{'x-access-token':context.getLoggedUser()?.token}})
          .then((res)=>{
            console.log(res.data);
            setImpianti(res.data)
          })
          .catch((err)=>{
            console.log('Houston, we have an error: ' + err + '. See below for more info')
            console.log(err)
            setReqErrMessage(err.response.data?.message)
            setReqErrAction(true)//show pop-up window
          })
  }, []);

  return(
    <>
    {!context.getLoggedUser() ? navigate('/401') : ''}
    {reqErrAction ?
    <ActionModal
      title='Request Error!'
      body={reqErrMessage}
      onClose={setReqErrAction.bind(false)}
      /> : ''}
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
            <CCardLink
              to='/myImpianti/dashboard'
              component={NavLink}
              onClick={()=>{
                console.log(item);
                context.setSelImp(item)
              }}>
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
