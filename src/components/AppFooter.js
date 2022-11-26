import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
      <span className="me-1">Ardeeno &copy; 2022 T41-SE22</span>
        <a href="https://www.unitn.it/" target="_blank" rel="noopener noreferrer">
        University Of Trento
        </a>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
