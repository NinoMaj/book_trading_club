import React from 'react'
import { connect } from 'react-redux'

import LoginForm from '../component/login-form'
import { login } from '../action/auth'

class LoginFormContainer extends React.Component {
  constructor(props) {
    super(props)

    let successMessage = ''
    if (typeof window !== 'undefined') {
      const storedMessage = localStorage.getItem('successMessage')

      if (storedMessage) {
        successMessage = storedMessage
        localStorage.removeItem('successMessage')
      }
    }

    this.state = {
      successMessage,
      name: '',
      userInput: {
        email: '',
        password: '',
      },
    }

    this.processForm = this.processForm.bind(this)
    this.changeUser = this.changeUser.bind(this)
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault()

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.userInput.email)
    const password = encodeURIComponent(this.state.userInput.password)
    const formData = `email=${email}&password=${password}`
    this.props.loginAction(formData, this.props.history)
  }

  changeUser(event) {
    const field = event.target.name
    const userInput = this.state.userInput
    userInput[field] = event.target.value

    this.setState({
      userInput,
    })
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.props.user.error}
        userInput={this.state.userInput}
        successMessage={this.state.successMessage}
      />
    )
  }

}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  loginAction: (user, history) => { dispatch(login(user, history)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer)
