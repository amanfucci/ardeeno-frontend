import React from 'react'

import { ActionModal } from 'src/components';
import {AppContext} from 'src/App';
import { useNavigate } from 'react-router-dom';

const Misurazioni = () =>{
  const [selErrAction, setSelErrAction] = React.useState(false)

  const navigate = useNavigate()
  const context = React.useContext(AppContext)

  React.useEffect(()=>{
    setSelErrAction(!context.getSelImp())
  }, [context])

  return (
    <>
      {!context.getLoggedUser() ? navigate('/home') : ''}
      {selErrAction ?
    <ActionModal
      title='No selection!'
      body='Please first select an Impianto in /myImpianti/list'
      onClose={()=>{setSelErrAction(false); navigate('/myImpianti/list')}}
      /> : ''}
    
    </>
  )
}


export default Misurazioni