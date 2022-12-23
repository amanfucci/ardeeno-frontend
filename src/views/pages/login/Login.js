import React from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CNavLink,
  CRow,
  CCardLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import axios from 'axios'

import {ActionModal} from 'src/components/index'
import {AppContext} from 'src/App'

import { API_URL } from 'src/App'

const Login = () => {
  const [validated, setValidated] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loginErrAction, setLoginErrAction] = React.useState(false);
  const navigate = useNavigate()
  const context = React.useContext(AppContext)

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setValidated(true) //Enables form validation

    console.log(context.getLoggedUser())

    const form = event.currentTarget
    if(form.checkValidity() === true){
      //send request, only if form is valid
      console.log('POST /auth')
      axios.post(API_URL+'/auth', {
          'email' : email,
          'password' : password,
        })
        .then((res) => {
          console.log(res)
          context.login({
            token: res.data.token,
            email: res.data.email,
            _id: res.data._id,
            ruolo: res.data.ruolo
          })
          //change utente state and redirect to /myAccount
          navigate('/myAccount')
        })
        .catch((err) => {
          console.log('Houston, we have an error: ' + err + '. See below for more info')
          console.log(err)
          setLoginErrAction(true)//show pop-up window
        })
    }
  }

  return (
    <>
    {context.getLoggedUser() ?
    <ActionModal
      title='Already logged in!'
      body={'Already logged in as ' + context.getLoggedUser().email}
      /> : ''}
    {loginErrAction ?
      <ActionModal
        title='Login Error!'
        body='See the console for more information'
        onClose={setLoginErrAction.bind(false)}
        /> : ''}
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        id="in_email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        pattern=".+@.+\..+"
                        required
                        onChange={(event)=>setEmail(event.currentTarget.value)}
                        />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        id="in_password"
                        type="password"
                        placeholder="Password"
                        autoComplete="Password"
                        required
                        onChange={(event)=>setPassword(event.currentTarget.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          id="in_submit"
                          color="primary"
                          className="px-4 text-white"
                          type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className='text-right'>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
                <CCardBody>
                  <CCardLink>
                    <CNavLink to='/' component={NavLink}>
                      Go back Home
                    </CNavLink>
                  </CCardLink>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '100%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Millions of users and thousands of
                      companies use Ardeeno as an innovation platform</p>
                    <CButton
                      color="primary"
                      onClick={()=>alert('Work in progress -- assigned to next sprint')}
                      className='bg-white text-primary'>
                      Register Now!
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    </>
  )
}

export default Login
