/* eslint-disable react/jsx-key */
import React from 'react'

import {NavLink} from 'react-router-dom'

import {InfoModal} from 'src/components/index'
import {AppContext} from 'src/App'

import { CCard, CCardBody, CFormInput, CInputGroup, CCol, CRow, CCardLink } from '@coreui/react'

const MyImpianti = () =>{
  const context = React.useContext(AppContext)

  return(
    <>
    {!context.getImp() ? <InfoModal title='Select one Impianto!' body='Please, select first an Impianto'/> : ''}
    <CRow>
        <CCol xs md={4}>
          <CCard >
            <CCardBody>
              {
              Object.keys(context.getImp()).map(key => 
                <CInputGroup className="mb-3">
                  <CFormInput disabled value={key}></CFormInput>
                  <CFormInput aria-disabled value={context.getImp()[key]}></CFormInput>
                </CInputGroup>        
                )
              }
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs md={4}>
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
        <CCol xs md={4}>
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
