import React from 'react'

import {ActionModal} from 'src/components/index'
import {AppContext} from 'src/App'
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
import {
  CCard,
  CCardBody,
  CFormInput,
  CInputGroup,
  CCol,
  CRow,
  CSpinner
} from '@coreui/react'
import { API_URL } from 'src/App'

const MyAccount = () =>{
  const [userData, setUserData] = React.useState({})
  const [reqErrAction, setReqErrAction] = React.useState(false)
  const [reqErrMessage, setReqErrMessage] = React.useState(false)

  const [loading, setLoading] = React.useState(false)

  const navigate = useNavigate()
  const context = React.useContext(AppContext)

  React.useEffect(() => {
    console.log('GET /myAcc')
    setLoading(true)
    axios.get(API_URL+'/myAcc',
          {headers:{'x-access-token':context.getLoggedUser()?.token}})
          .then((res)=>{
            console.log(res.data);
            setUserData(res.data)
            setLoading(false)
          })
          .catch((err)=>{
            console.log('Houston, we have an error: ' + err + '. See below for more info')
            console.log(err)
            setReqErrMessage(err?.response?.data?.message ?? 'No response, see console')
            setReqErrAction(true)//show pop-up window
            setLoading(false)
          })
  }, [context]);

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
      <CCol xs md={6}>
        <CCard >
        <CCardBody>
        {loading ? <CSpinner color="primary"/> : ''}
          {
          Object.keys(userData).map(key => 
            <CInputGroup className="mb-3" key={key}>
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
