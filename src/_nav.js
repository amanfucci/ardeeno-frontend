import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilHome,
  cilList,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

export const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />
  }
]

export const _nav_cliente = [
  {
    component: CNavTitle,
    name: 'Client Area',
  },
  {
    component: CNavItem,
    name: 'My Account',
    to: '/myAccount',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'My Impianti',
    to: '/myImpianti',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items:[{
      component: CNavItem,
      name: 'List',
      to: '/myImpianti/list',
    },
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/myImpianti/dashboard',
    },
    {
      component: CNavItem,
      name: 'Heatmap',
      to: '/myImpianti/heatmap',
    },
    {
      component: CNavItem,
      name: 'Misurazioni',
      to: '/myImpianti/misurazioni',
    }]
  }
]