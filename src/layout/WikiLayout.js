import React from 'react'
import { WikiContent, WikiSidebar, AppFooter, WikiHeader } from '../components/index'

const WikiLayout = () => 
    <div>
      <WikiSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <WikiHeader />
        <div className="body flex-grow-1 px-3">
          <WikiContent />
        </div>
        <AppFooter />
      </div>
    </div>

export default WikiLayout