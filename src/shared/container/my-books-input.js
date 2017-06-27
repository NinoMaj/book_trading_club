import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import AddButton from '../component/add-button'
import InputText from '../component/text-input'
import { addBook } from '../action/books'

const DivContainer = styled.div`
  margin: 20px auto;
  width: 300px;
`

class MyBooksInput extends React.Component {
  constructor() {
    super()

    this.state = {
      text: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      text: e.target.value,
    })
  }

  handleButtonClick() {
    this.dispatchAddBookAction()
  }

  handleSubmit(e) {
    if (e.which === 13) {
      this.dispatchAddBookAction()
    }
  }

  dispatchAddBookAction() {
    this.props.addBookAction(this.state.text, this.props.userEmail)
    this.setState({
      text: '',
    })
  }

  render() {
    return (
      <DivContainer>
        <InputText
          placeholder="Enter book..."
          value={this.state.text}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <AddButton handleClick={this.handleButtonClick} />
      </DivContainer>
    )
  }
}

const mapStateToProps = state => ({
  userEmail: state.user.email,
})

const mapDispatchToProps = dispatch => ({
  addBookAction: (text, userEmail) => dispatch(addBook(text, userEmail)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyBooksInput)
