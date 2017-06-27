// @flow

import React from 'react'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'

type Props = {
  title: string,
  subtitle: string,
  imgSrc: string,
  imgAlt: string,
  cardText: string,
}

const CardItem = ({ title, subtitle, imgSrc, imgAlt, cardText }: Props) =>
  (
    <Card>
      <CardMedia
        overlay={<CardTitle title={title} subtitle={subtitle} />}
      >
        <img src={imgSrc} alt={imgAlt} />
      </CardMedia>
      <CardText>
        {cardText}
      </CardText>
    </Card>
  )

export default CardItem
