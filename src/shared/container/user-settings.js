// @flow

import React from 'react'
import { connect } from 'react-redux'

import { getUser, updateUser, showAlert, hideAlert } from '../action/user-settings'
import UserSettingsForm from '../component/user-settings-form'
import Alert from '../component/alert'

type Props = {
  userEmail: string,
  getUserAction: () => any,
}

type State = {
  emailReceived: boolean,
  userReceived: boolean,
  user: {
    fullName: string,
    city: string,
    state: string,
  },
}


class UserSettings extends React.Component<DefaultProps, Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      emailReceived: false,
      userReceived: false,
      user: {
        fullName: this.props.fullName || '',
        city: this.props.city || '',
        state: this.props.state || '',
      },
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.processForm = this.processForm.bind(this)
  }
  componentDidMount() {
    if (this.props.userEmail && this.state.emailReceived === false) {
      this.props.getUserAction(this.props.userEmail)
      this.emailReceived()
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.userEmail && this.state.emailReceived === false) {
      this.props.getUserAction(nextProps.userEmail: string)
      this.emailReceived()
    }
    const userReceived = (nextProps.fullName || nextProps.city || nextProps.state)
    if (userReceived && this.state.userReceived === false) {
      this.setState({
        userRecieved: true,
        user: {
          fullName: nextProps.fullName,
          city: nextProps.city,
          state: nextProps.state,
        },
      })
    }
  }
  emailReceived() {
    this.setState({
      emailReceived: true,
    })
  }

  handleOnChange(e) {
    const field = e.target.name
    const user = this.state.user
    user[field] = e.target.value
    this.setState({
      user,
    })
  }

  processForm(e) {
    e.preventDefault()
    this.props.updateUserAction(
      this.props.userEmail,
      this.state.user.fullName,
      this.state.user.city,
      this.state.user.state,
    )
    this.toggleAlert('Account settings updated.')
  }

  toggleAlert(message) {
    this.props.showAlertAction(message)
    setTimeout(() => {
      this.props.hideAlertAction()
    }, 3000)
  }

  render() {
    return (
      <div>
        <UserSettingsForm
          fullName={this.state.user.fullName}
          city={this.state.user.city}
          state={this.state.user.state}
          onChange={this.handleOnChange}
          onClick={this.processForm}
        />
        {this.props.showAlert && <Alert message={this.props.alertMessage} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userEmail: state.user.email,
  fullName: state.userSettings.fullName,
  city: state.userSettings.city,
  state: state.userSettings.state,
  showAlert: state.userSettings.alert.show,
  alertMessage: state.userSettings.alert.message,
})

const mapDispatchToProps = dispatch => ({
  getUserAction: (userEmail: string) => dispatch(getUser(userEmail)),
  updateUserAction: (
    userEmail: string,
    fullName: string,
    city: string,
    state: string,
  ) => dispatch(updateUser(userEmail, fullName, city, state)),
  showAlertAction: message => dispatch(showAlert(message)),
  hideAlertAction: () => dispatch(hideAlert()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)
