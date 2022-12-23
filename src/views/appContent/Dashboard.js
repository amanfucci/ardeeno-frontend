/* eslint-disable react/jsx-key */
import React from 'react'

import {NavLink} from 'react-router-dom'

import {ActionModal} from 'src/components/index'
import {AppContext} from 'src/App'
import { useNavigate } from 'react-router-dom';

import {
  CCard,
  CCardBody,
  CFormInput,
  CInputGroup,
  CCol,
  CRow,
  CCardLink} from '@coreui/react'

const MyImpianti = () =>{

  const navigate = useNavigate()
  const context = React.useContext(AppContext)

  return(
    <>
    {!context.getLoggedUser() ? navigate('/401') : ''}
    {!context.getSelImp() ?
    <ActionModal
      title='Select one Impianto!'
      body='Please, select first an Impianto'
      /> : ''}
    <CRow xs={{ cols: 1, gutter: 3 }} md={{ cols: 3, gutter: 5}}>
        <CCol xs>
          <CCard >
            <CCardBody>
              {
              Object.keys(context.getSelImp()).map(key => 
                <CInputGroup className="mb-3">
                  <CFormInput disabled value={key}></CFormInput>
                  <CFormInput aria-disabled value={context.getSelImp()[key]}></CFormInput>
                </CInputGroup>        
                )
              }
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard >
            <CCardBody>
              Visualizza le misurazioni del tuo Impianto
              in una performante Heatmap!
              <br/>
              <CCardLink  to='/myImpianti/heatmap' component={NavLink}>
              -&gt;Heatmap 
              </CCardLink>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard >
            <CCardBody>
              Visualizza le misurazioni del tuo Impianto
              in forma tabulare.
              <br/>
              <CCardLink to='/myImpianti/misurazioni' component={NavLink}>
              -&gt;Misurazioni
              </CCardLink>
            </CCardBody>
          </CCard>
        </CCol>
    </CRow>
    </>
  )
}


export default MyImpianti
