import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/wiki/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/wiki/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/wiki/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/wiki/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/wiki/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/wiki/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/wiki/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/wiki/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/wiki/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/wiki/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/wiki/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/wiki/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/wiki/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/wiki/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/wiki/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/wiki/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/wiki/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/wiki/base/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/wiki/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/wiki/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/wiki/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/wiki/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/wiki/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/wiki/forms/select',
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/wiki/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/wiki/forms/range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/wiki/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/wiki/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/wiki/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/wiki/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/wiki/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/wiki/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/wiki/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/wiki/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/wiki/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/wiki/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/wiki/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/wiki/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/wiki/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
