import React from 'react'
import SignUpForm from '../component/sign-up-form'

// type SignUpFormContainerState = {
//   errors: object,
//     user: {
//       email: string,
//       name: string,
//       password: string,
//     },
// }

// type DefaultProps = {
//   history: ?Object
// }

// type Props = {
//   history: ?Object
// }

// type State = {
//   errors: ?Object,
//   user: {
//     email: ?string,
//     name: ?string,
//     password: ?string
//   }
// }

class SignUpFormContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: '',
      },
    }

    this.processForm = this.processForm.bind(this)
    this.changeUser = this.changeUser.bind(this)
  }

  changeUser(event) {
    const field = event.target.name
    const user = this.state.user
    user[field] = event.target.value

    this.setState({
      user,
    })
  }

  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault()

    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.name)
    const email = encodeURIComponent(this.state.user.email)
    const password = encodeURIComponent(this.state.user.password)
    const formData = `name=${name}&email=${email}&password=${password}`

    // create an AJAX request
    const xhr = new XMLHttpRequest()
    xhr.open('post', '/auth/sign-up')
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {},
        })

        // set a message
        if (window !== 'undefined') {
          localStorage.setItem('successMessage', xhr.response.message)
        } else {
          // eslint-disable-next-line
          console.log('no window object present')
        }

        // make a redirect
        this.props.history.push('/login')
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {}
        errors.summary = xhr.response.message

        this.setState({
          errors,
        })
      }
    })
    xhr.send(formData)
  }

  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    )
  }
}

export default SignUpFormContainer
