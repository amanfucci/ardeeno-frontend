import React from 'react'

import {ActionModal} from 'src/components/index'
import {AppContext} from 'src/App'
import { useNavigate } from 'react-router-dom';

import {NavLink} from 'react-router-dom'

import axios from 'axios'
import {
  CCard,
  CCardBody,
  CFormInput,
  CInputGroup,
  CCol,
  CRow,
  CCardLink,
  CFormCheck,
  CButtonGroup,
  CButton,
  CPopover
} from '@coreui/react'

import { API_URL } from 'src/App'
import CIcon from '@coreui/icons-react';
import { cilListFilter } from '@coreui/icons';

const MyImpianti = () =>{
  const [impianti, setImpianti] = React.useState([])
  const [reqErrAction, setReqErrAction] = React.useState(false)
  const [reqErrMessage, setReqErrMessage] = React.useState(false)
  
  const [modelli, setModelli] = React.useState([])
  const [filterStato, setFilterStato] = React.useState(new Set())
  const [filterModelli, setFilterModelli] = React.useState(new Set())

  const navigate = useNavigate()
  const context = React.useContext(AppContext)
  
  React.useEffect(() => {
    

    console.log('GET /myAcc/impianti')
    axios.get(API_URL+'/myAcc/impianti',
          {headers:{'x-access-token':context.getLoggedUser()?.token}})
          .then((res)=>{
            console.log(res.data);
            setImpianti(res.data.sort((i1, i2) => i1.dataAcquisto <= i2.dataAcquisto));
            setModelli([...new Set(res.data.map(imp => imp.modello))])
          })
          .catch((err)=>{
            console.log('Houston, we have an error: ' + err + '. See below for more info')
            console.log(err)
            setReqErrMessage(err?.response?.data?.message ?? 'No response, see console')
            setReqErrAction(true)//show pop-up window
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
      <CCol>
        <CCard color='transparent' className='border-0'>
          <CCardBody>
            <CButtonGroup role="group">
              <CFormCheck
                type="radio"
                button={{ color: 'dark', variant:'ghost'  }}
                name="statoFilter"
                id="statoFilter_Tutti"
                autoComplete="off"
                label="Tutti"
                onClick={ () =>
                  setFilterStato(new Set())
                }
                defaultChecked
              />
              <CFormCheck
                type="radio"
                button={{ color: 'dark', variant:'ghost' }}
                name="statoFilter"
                id="statoFilter_Attivi"
                autoComplete="off"
                label="Attivi"
                onClick={ () =>
                  setFilterStato(new Set([false]))
                }
              />
              <CFormCheck
                type="radio"
                button={{ color: 'dark', variant:'ghost'  }}
                name="statoFilter"
                id="statoFilter_Dismessi"
                autoComplete="off"
                label="Dismessi"
                onClick={ () =>
                  setFilterStato(new Set([true]))
                }
              />
              <CPopover
                title="Modelli"
                content={
                  <>
                    <CButtonGroup vertical role="group">
                    {
                      modelli.map(modello =>
                          <CFormCheck
                          button={{ color: 'dark', variant:'ghost'  }}
                          id={"modelloFilter_"+modello}
                          key={"modelloFilter_"+modello}
                          autoComplete="off"
                          label={modello}
                          checked={filterModelli.has(modello)}
                          onClick={() => {
                            const _filterModelli = new Set(filterModelli);
                            if(_filterModelli.has(modello)){
                              _filterModelli.delete(modello)
                              setFilterModelli(_filterModelli)
                            }else{
                              _filterModelli.add(modello)
                              setFilterModelli(_filterModelli)
                            }
                          }
                          }
                          />)
                    }            
                    </CButtonGroup>
                  </>}
                placement="bottom"
              >
                <CButton
                  color='dark'
                  variant='ghost'
                >
                  <CIcon icon={cilListFilter} size="xl"></CIcon>
                </CButton>
              </CPopover>
            </CButtonGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow xs={{ cols: 1, gutter: 3 }} md={{ cols: 3, gutter: 5}}>
      {
        impianti.map( item =>
        <CCol
          hidden={(filterStato.size !== 0 && !filterStato.has(item.isDismesso)) || (filterModelli.size !== 0 && !filterModelli.has(item.modello))}
          xs
          md={6}
          key={item._id+'_group'}
          >
          <CCard>
          <CCardBody>
            {
            Object.keys(item).filter(k => ['_id', 'superficie', 'fattura'].every(k1 => k !== k1)).map(key => 
              <CInputGroup
                className="mb-3"
                key={item._id+'_'+key+'_group'}
                >
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
