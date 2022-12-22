/* eslint-disable react/display-name */
import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody
} from '@coreui/react'

import { func, string } from 'prop-types';

const InfoModal = (props)=>{
  const [visible, setVisible] = React.useState(true)
  const onClose = () => {
    setVisible(false)
    props.onClose?.call()
  }
  return (
    <>
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader onClose={onClose}>
        <CModalTitle>{props.title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{props.body}</CModalBody>
    </CModal>
    </>
  )
}

InfoModal.propTypes = {
  title:string,
  body:string,
  onClose:func
}

export default InfoModal