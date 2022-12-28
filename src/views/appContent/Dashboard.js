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
  CCardLink,
  CCardTitle} from '@coreui/react'

const MyImpianti = () =>{
  const [selErrAction, setSelErrAction] = React.useState(false)
  const navigate = useNavigate()
  const context = React.useContext(AppContext)

  React.useEffect(()=>{
    setSelErrAction(!context.getSelImp())
  }, [context])

  return(
    <>
    {!context.getLoggedUser() ? navigate('/401') : ''}
    {selErrAction ?
    <ActionModal
      title='No selection!'
      body='Please first select an Impianto in /myImpianti/list'
      onClose={()=>{setSelErrAction(false); navigate('/myImpianti/list')}}
      /> : ''}
    <CRow xs={{ cols: 1, gutter: 3 }} md={{ cols: 3, gutter: 5}}>
        <CCol xs>
          <CCard >
            <CCardBody>
              {
              Object.keys(context.getSelImp()).map(key => 
                <CInputGroup className="mb-3" key={key}>
                  <CFormInput disabled value={key}></CFormInput>
                  <CFormInput aria-disabled value={context.getSelImp()?.[key]}></CFormInput>
                </CInputGroup>        
                )
              }
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard >
            <CCardBody>
            <CCardTitle>Heatmap</CCardTitle>
              Visualizza le misurazioni del tuo Impianto
              in una performante Heatmap!
              <br/>
              <CCardLink  to='/myImpianti/heatmap' component={NavLink}>
              -&gt;Heatmap 
              </CCardLink>
            </CCardBody>
          </CCard>
        </CCol>
        {/*
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
        */}
    </CRow>
    </>
  )
}


export default MyImpianti
