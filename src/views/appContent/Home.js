import React from 'react'

import {
  CCard,
  CCardBody,
  CCol,
  CCardImage,
  CRow,
  CCardTitle,
  CButton,
  CInputGroup,
  CFormInput
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilClipboard } from '@coreui/icons'
import _imgArdeeno from 'src/assets/images/multitask-ardeeno.png'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Home = () =>
  <>
  <CRow xs={{ cols: 1, gutter: 3 }} md={{ cols: 3, gutter: 5}}>

    <CCol xs>
      <CCard className="h-100 w-100">
        <CCardBody>
        Ardeeno è Leader Italiano nella sensoristica IoT dal 2005.
        </CCardBody>
        <CCardImage src={_imgArdeeno}/>

      </CCard>
    </CCol>

    <CCol xs>
      <CCard className="h-100 w-100">
        <CCardBody>
        La nostra mission è rendere gli impianti
        IoT accessibili a chiunque, da studenti a ditte private.
        Nel corso degli anni i nostri impianti sono stati il fulcro
        di centinaia di progetti.
        </CCardBody>
      </CCard>
    </CCol>

    <CCol xs>
      <CCard className="h-100 w-100">
        <CCardBody>
        Ardeeno progetta, installa e manutenziona impianti IoT,
        consentendo a persone di tutta Italia di ottenere facilmente Big Data su scala
        geografica - in maniera affidabile. I nostri impianti sono diretti, semplici e potenti, pronti
        a soddisfare le esigenze degli utenti, dagli studenti
        ai maker, fino agli sviluppatori professionisti.
        </CCardBody>
      </CCard>
    </CCol>

    <CCol xs>
      <CCard className="h-100 w-100">
        <CCardBody>
        Ardeeno è nato all&apos;Istituto di Data Science di Povo-Trento come strumento per
        misurazioni su larga scala.
        Non appena Ardeeno ha raggiunto una comunità più ampia, i modelli di Impianto IoT in vendita si sono adattati
        a nuove esigenze e sfide, differenziandosi per precisione della scheda microcontroller e per range di parametri misurati.
        </CCardBody>
      </CCard>
    </CCol>
    
    <CCol xs>
      <CCard className="h-100">
        <CCardBody>
          <CCardTitle>
          Contattaci
          </CCardTitle>

          <CInputGroup className="mb-3">
            <CButton type="button" value="support@ardeeno.cloud" color="secondary" variant="outline" onClick={(event)=>{
                navigator.clipboard
                .writeText(event.target.value)
                .then(() => {
                  console.log("Copied to clipboard "+event.target.value);
                })
            }}><CIcon icon={cilClipboard}/></CButton>
            <CFormInput value="support@ardeeno.cloud" aria-disabled/>
         </CInputGroup>

         <CInputGroup className="mb-3">
            <CButton type="button" value="+39 83057566" color="secondary" variant="outline" onClick={(event)=>{
                navigator.clipboard
                .writeText(event.target.value)
                .then(() => {
                  console.log("Copied to clipboard "+event.target.value);
                })
            }}><CIcon icon={cilClipboard}/></CButton>
            <CFormInput value="+39 83057566" aria-disabled/>
         </CInputGroup>

        </CCardBody>
      </CCard>
    </CCol>

    <CCol xs>
        <MapContainer 
          center={[46.06692696202572, 11.150354087784466]}
          zoom={16}
          scrollWheelZoom={false}
          className="h-100"
          style={{'minHeight':'5cm'}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[46.06692696202572, 11.150354087784466]}>
            <Popup>
              Ardeeno - Sede Centrale
              <br/><hr/> 
              Sommarive 18 Povo
            </Popup>
          </Marker>
        </MapContainer>
    </CCol>

  </CRow>

  </>


export default Home
