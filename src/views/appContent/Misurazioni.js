import React from 'react'

import { ActionModal } from 'src/components';
import { API_URL, AppContext} from 'src/App';
import { useNavigate } from 'react-router-dom';

const Misurazioni = () =>{
  const [infoAction, setInfoAction] = React.useState(false);

  const navigate = useNavigate()
  const context = React.useContext(AppContext)

  return (
  <>
    {!context.getLoggedUser() ? navigate('/home') : ''}
    {infoAction ?
      <ActionModal
        title='No selection!'
        body='Please first select an Impianto in /myImpianti/list'
        onClose={setInfoAction.bind(false)}
        /> : ''}
  
  </>
  )
}


export default Misurazioni