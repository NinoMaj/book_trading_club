// @flow

import React from 'react'
import styled, { keyframes } from 'styled-components'

const BgImg = styled.div`
  background-image: url('https://s3.eu-central-1.amazonaws.com/ninomajder.com/Book_Trading_Club/book-home_cover.jpg');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  position: relative;
  opacity: 0.75;

  /* Turn off parallax scrolling for tablets and phones */
  @media (max-width: 1024px) {
    background-attachment: scroll;
  }
`

const DisplayMiddle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  white-space: nowrap;
`

const opacity = keyframes`
  0%{opacity: 0%}
  100%{opacity: 100%}
`
const Text = styled.span`
  color: #fff;
  background-color: #000;
  text-align: center;
  padding: 12px 24px;
  font-size: 24px;
  letter-spacing: 4px;
  animation-duration: ${opacity} 3.8s;
`

const TextHideSmall = styled.span`
  @media (max-width: 600px) {
	  display: none;
  }
`

const HomeCover = () =>
  (
    <BgImg>
      <DisplayMiddle>
        <Text>BOOK <TextHideSmall>TRADING </TextHideSmall>CLUB</Text>
      </DisplayMiddle>
    </BgImg>
)

export default HomeCover
