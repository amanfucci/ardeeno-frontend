/* eslint-disable react/display-name */
import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody
} from '@coreui/react'

import { func, string } from 'prop-types';

const ActionModal = (props)=>{
  const [visible, setVisible] = React.useState(true)
  const onClose = () => {
    setVisible(false)
    props.onClose?.call()
    console.log('ActionModal.onClose()');
  }
  return (
    <>
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{props.title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{props.body}</CModalBody>
    </CModal>
    </>
  )
}

ActionModal.propTypes = {
  title:string,
  body:string,
  onClose:func
}

export default ActionModal