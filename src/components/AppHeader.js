import React from 'react'
import { NavLink, useNavigate, useLocation  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibAbstract, cibSuperuser, cilAccountLogout, cilMenu, cilUser, cilUserPlus, cilUserX } from '@coreui/icons'

import { AppContext } from 'src/App'

import { logo } from 'src/assets/brand/logo'

import {InfoModal} from 'src/components/index'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const navigate = useNavigate()
  const context = React.useContext(AppContext)

  const [logoutAction, setLogoutAction] = React.useState(false)

  return (
    <>
    {logoutAction ? <InfoModal 
      title='Succesful Logout' 
      body='Close this window and go back home'
      onClose={()=>{setLogoutAction(false);navigate('/home');}}></InfoModal> : ''}
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink>
              {useLocation().pathname}
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink component={NavLink}>
              <CIcon icon={cilAccountLogout} size="lg" onClick={() => {
                console.log('setLogoutAction(true)');
                setLogoutAction(true);
                context.logout();
              }}/>
            </CNavLink>       
          </CNavItem>
          <CNavItem>
            <CNavLink to={context.getLoggedUser() ? "/myAccount" : "/login"} component={NavLink}>
              <CIcon icon={context.getLoggedUser() ? cilUser : cilUserPlus } size="lg" />
            </CNavLink>       
          </CNavItem>
        </CHeaderNav>
      </CContainer>
    </CHeader>
    </>
  )
}

export default AppHeader
