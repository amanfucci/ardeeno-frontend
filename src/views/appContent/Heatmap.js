import axios from 'axios'
import React from 'react'
import { API_URL, AppContext} from 'src/App'
import { useNavigate } from 'react-router-dom'
import { ActionModal } from 'src/components'

import {StaticMap, MapContext} from 'react-map-gl';
import DeckGL, {HeatmapLayer, HexagonLayer} from 'deck.gl';
import {
  CCard,
  CCol,
  CRow,
  CButton,
  CButtonGroup,
  CDropdownToggle,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilArrowRight} from '@coreui/icons'

const COLORS = [[0, 172, 105], [0, 172, 105], [244, 161, 0], [247, 100, 0], [232, 21, 0], [227, 0, 89], [105, 0, 99]];

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

const IS_MOBILE = navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)

const Heatmap = () => {
  const [selErrAction, setSelErrAction] = React.useState(false)
  const [reqErrAction, setReqErrAction] = React.useState(false)
  const [reqErrMessage, setReqErrMessage] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const [heatmap, setHeatmap] = React.useState(false)

  const [selSnap_i, setSelSnap_i] = React.useState(false)
  const [selSnapTs, setSelSnapTs] = React.useState(false)
  const [selSnap, setSelSnap] = React.useState(false)
  const [selParam, setSelParam] = React.useState(false)

  const navigate = useNavigate()
  const context = React.useContext(AppContext)

  React.useEffect(()=>{
    setSelErrAction(!context.getSelImp())
  }, [context])

  const isBound = i => {
    return heatmap?.snapshots && (0 <= i && i < heatmap.snapshots.length)
  }


  //Init Heatmap
  React.useEffect(()=>{
    const loggedUser = context.getLoggedUser()
    const selImpId = context.getSelImp()?._id

    if(selImpId && loggedUser){
      console.log('GET /myAcc/impianti/:selImp/heatmap')
      setLoading(true)
      axios.get(API_URL+'/myAcc/impianti/'+selImpId+'/heatmap', 
      {headers:{'x-access-token':loggedUser.token}})
      .then((res)=>{
        const heatmap = res.data
        console.log(heatmap)
        const _selSnap_i = heatmap.snapshots.length-1
        const _selSnapTs = new Date(heatmap.snapshots[_selSnap_i]).getTime()
        setHeatmap(heatmap)
        setSelSnap_i(_selSnap_i)
        setSelSnapTs(_selSnapTs)
        setSelParam(heatmap.parametri[0].name)
        setLoading(false)
      }).catch((err)=>{
        console.log('Houston, we have an error: ' + err + '. See below for more info')
        console.log(err)
        setReqErrMessage(err?.response?.data?.message ?? 'No response, see console')
        setReqErrAction(true)//show pop-up window
        setLoading(false)
      })
    }
  }, [context])

  // Load selSnapTs to selSnap
  React.useEffect(()=>{
    const loggedUser = context.getLoggedUser()
    const selImpId = context.getSelImp()?._id

    if(!heatmap) return;
    
    console.log('GET /myAcc/impianti/:selImp/snapshots/:selSnap')
    axios.get(API_URL+'/myAcc/impianti/'+selImpId+'/snapshots/'+selSnapTs, 
    {headers:{'x-access-token':loggedUser.token}})
    .then((res)=>{
      const _selSnap = []
      //change MisurazioneSchema to avoid this!! -- add lat, long to MisurazioneSchema
      for(let misurazione of res.data){
        const mySensore = heatmap.sensori.find(sens => sens._id === misurazione.sensore )
        _selSnap.push({
          sensore:misurazione.sensore,
          lat:mySensore.lat,
          long:mySensore.long,
          valori:misurazione.valori
        })
      }
      ///
      console.log(_selSnap)
      setSelSnap(_selSnap)
    })
    .catch((err)=>{
      console.log('Houston, we have an error: ' + err + '. See below for more info')
      console.log(err)
      setReqErrMessage(err?.response?.data?.message ?? 'No response, see console')
      setReqErrAction(true)//show pop-up window
    })    
  }, [context, heatmap, selSnapTs])

  //set selSnapTs from selSnap_i
  React.useEffect(()=>{
    setSelSnapTs(parseInt(new Date(heatmap?.snapshots?.[selSnap_i]).getTime()))
  }, [heatmap, selSnap_i])

  return (
  <>
    {!context.getLoggedUser() ? navigate('/401') : ''}
    {selErrAction ?
    <ActionModal
      title='No selection!'
      body='Please first select an Impianto in /myImpianti/list'
      onClose={()=>{setSelErrAction(false); navigate('/myImpianti/list')}}
      /> : ''}
    {reqErrAction ?
    <ActionModal
      title='Request Error!'
      body={reqErrMessage}
      onClose={setReqErrAction.bind(false)}
      /> : ''}
    <DeckGL
      initialViewState={{
        latitude: heatmap?.lat ?? 0,
        longitude: heatmap?.long ?? 0,
        zoom: 13,
        minZoom: 10,
        maxZoom: 17,
        pitch: 40,
        bearing: 0,    
      }}
      controller={true}
      ContextProvider={MapContext.Provider}
      pickable={true}
      geoToolTip={(data)=>{console.log(data)}}
      layers={[
          new HeatmapLayer({
            data: selSnap || [],
            // Parsing
            getPosition: i => [i.long, i.lat],
            getWeight: i => i.valori[selParam],
            // Styles
            opacity: 0.3,
            intensity: 1,
            radiusPixels: 30,
            //colorDomain: [0.01, 6],
            colorRange: COLORS,
            aggregation: 'MEAN',
            updateTriggers:{
              getWeight: selParam
            }
          }),
          new HexagonLayer({
            data: selSnap || [],
            opacity: IS_MOBILE ? 0.5 : 0,
            getPosition: i => [i.long, i.lat],
            getColorWeight: i => i.valori[selParam],
            radius: 100,
            colorAggregation: 'MEAN',
            updateTriggers:{
              getColorWeight: selParam
            }
        })
        ]}
      >
      <StaticMap mapStyle={MAP_STYLE} />
    </DeckGL>

    <CRow>
      <CCol md={2} style={{minWidth:'min-content', maxWidth:'min-content'}}>
        <CCard className='text-center'>
        <CAccordion>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>{new Date(selSnapTs).toLocaleDateString()}&nbsp;&nbsp;<br/>{new Date(selSnapTs).toLocaleTimeString()}</CAccordionHeader>
            <CAccordionBody>
              <CButtonGroup vertical>
                <CButton
                  color='primary'
                  variant='outline'
                  onClick={()=>{isBound(selSnap_i-1) && setSelSnap_i(selSnap_i-1)}}
                  disabled={!isBound(selSnap_i-1)}
                  ><CIcon icon={cilArrowLeft}/></CButton>
                <CButton
                  color='primary'
                  variant='outline'
                  onClick={()=>{isBound(selSnap_i+1) && setSelSnap_i(selSnap_i+1)}}
                  disabled={!isBound(selSnap_i+1)}
                  ><CIcon icon={cilArrowRight}/></CButton>
                <CDropdown variant="btn-group">
                  <CDropdownToggle color="primary" variant='outline'>{selParam}</CDropdownToggle>
                  <CDropdownMenu>
                  {
                    (heatmap.parametri ?? []).map(par =>
                      <CDropdownItem
                        className={par.name === selParam ? 'bg-primary' : ''}
                        label={par.name}
                        value={par.name}
                        onClick={()=>setSelParam(par.name)}
                        key={par.name}
                      >{par.name}</CDropdownItem>
                    )
                  }
                  </CDropdownMenu>
                </CDropdown>
              </CButtonGroup>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
        </CCard>
      </CCol>
      {loading ? <CSpinner color="primary"/> : ''}
    </CRow>
    
    </>
  )
}



export default Heatmap