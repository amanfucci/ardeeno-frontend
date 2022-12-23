import React from 'react'

import { InfoModal } from 'src/components'

const Heatmap = () => {
  const [infoAction, setInfoAction] = React.useState(false);

  return (
  <>
  {infoAction ?
      <InfoModal
        title='No selection!'
        body='Please first select an Impianto in /myImpianti/list'
        onClose={()=>setInfoAction(false)}
        /> : ''}
  
  </>
  )
}



export default Heatmap