// @flow

import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { hideAlert } from '../action/user-settings'

const AlertDiv = styled.div`
  width: 300px;
  height: 100px;
  position: fixed;
  bottom: 1%;
  left: 50%; /*fallback*/
  left: calc(50% - 150px);
  text-align: center;
  line-height: 100px;
  font-size: 1em;
  color: #fff;
  background-color: #4CAF50;
  padding: 0.01em 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
`

type Props = {
  message: string,
  hideAlertAction: Function,
}

const Alert = ({ message, hideAlertAction }: Props) => (
  <AlertDiv onClick={hideAlertAction}>{message}</AlertDiv>
)

const mapDispatchToProps = dispatch => ({
  hideAlertAction: () => dispatch(hideAlert()),
})

export default connect(null, mapDispatchToProps)(Alert)
