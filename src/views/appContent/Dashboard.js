/* eslint-disable react/jsx-key */
import React from 'react'

import {NavLink} from 'react-router-dom'

import {InfoModal} from 'src/components/index'
import {AppContext} from 'src/App'

import { CCard, CCardBody, CFormInput, CInputGroup, CCol, CRow, CCardLink } from '@coreui/react'

const MyImpianti = (props) =>{
  const [imp, setImp] = React.useState({})

  const context = React.useContext(AppContext)
  React.useEffect(() => {
    setImp(props)
  }, []);

  return(
    <>
    {!imp ? <InfoModal title='Select one Impianto!' body='Please, select first an Impianto'/> : ''}
    <CRow>
        <CCol xs md={4}>
          <CCard >
            <CCardBody>
              {
              Object.keys(imp).map(key => 
                <CInputGroup className="mb-3">
                  <CFormInput disabled value={key}></CFormInput>
                  <CFormInput aria-disabled value={imp[key]}></CFormInput>
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
              <CCardLink  to='/myImpianti/dashboard' component={NavLink}>
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
              <CCardLink to='/myImpianti/dashboard' component={NavLink}>
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
