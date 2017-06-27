// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'

type Props = {
  onSubmit: func,
  onChange: func,
  errors: object,
  user: object,
}

const CardContainer = styled(Card) `
  margin: 0 auto;
  text-align: center;
  max-width: 700px;
`

const FieldLine = styled.div`
  padding: 16px;
`

const SignUpForm = ({ onSubmit, onChange, errors, user }: Props) => (
  <CardContainer>
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}
      <FieldLine>
        <TextField
          floatingLabelText="Name"
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
          id="id"
        />
      </FieldLine>

      <FieldLine>
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
          id="id"
        />
      </FieldLine>

      <FieldLine>
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
          id="id"
        />
      </FieldLine>

      <RaisedButton type="submit" label="Create New Account" primary />

      <CardText>Already have an account? <Link to="/login">Log in</Link></CardText>
    </form>
  </CardContainer>
)

export default SignUpForm
