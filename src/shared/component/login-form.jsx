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
  errors: Object,
  userInput: ?Object,
  successMessage: ?string
}

const CardContainer = styled(Card)`
  margin: 0 auto;
  text-align: center;
  max-width: 700px;
`

const FieldLine = styled.div`
  padding: 16px;
`

const Text = styled.p`
  color: #AB4442;
`

const LoginForm = ({ onSubmit, onChange, errors, userInput, successMessage }: Props) => (
  <CardContainer>
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Login</h2>

      {successMessage && <Text className="success-message">{successMessage}</Text>}
      {errors.summary && <Text className="error-message">{errors.summary}</Text>}

      <FieldLine>
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={userInput.email}
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
          value={userInput.password}
          id="id"
        />
      </FieldLine>



      <FieldLine>
        <RaisedButton type="submit" label="Log in" primary />
      </FieldLine>

      <CardText>Don't have an account? <Link to="/sign-up">Create one</Link></CardText>
    </form>
  </CardContainer>
  )

export default LoginForm
