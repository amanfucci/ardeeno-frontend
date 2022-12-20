import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilHome,
  cilList,
  cilUser,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'User Area',
  },
  {
    component: CNavItem,
    name: 'My Account',
    to: '/myAcc',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'My Impianti',
    to: '/myAcc/impianti',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  }
]

export default _nav
